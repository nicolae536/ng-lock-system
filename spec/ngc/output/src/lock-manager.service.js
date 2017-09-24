"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/map");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var lock_constants_1 = require("./lock.constants");
var ng_lock_system_module_1 = require("./ng-lock-system.module");
var util_service_1 = require("./util.service");
var LockManagerService = /** @class */ (function () {
    function LockManagerService(enableLogging, _util) {
        this._util = _util;
        this._managerLock$ = new BehaviorSubject_1.BehaviorSubject({});
        if (enableLogging) {
            this.startLogging();
        }
    }
    /**
     * @desc  sets the componentId as locked inside the _managerLock$ observable
     * @param {string} componentId
     * @param {boolean} lockManager if passed with true this will mark the manager as locked
     */
    LockManagerService.prototype.lockComponent = function (componentId, lockManager) {
        if (lockManager === void 0) { lockManager = false; }
        this.dispatchStatus(lock_constants_1.LOCK_STATUS.LOCKED, componentId, lockManager);
    };
    /**
     * @desc  sets the componentId as unlocked inside the _managerLock$ observable we automatically mark the lockComponent as false
     * @param {string} componentId
     */
    LockManagerService.prototype.unlockComponent = function (componentId) {
        this.dispatchStatus(lock_constants_1.LOCK_STATUS.UNLOCKED, componentId, false);
    };
    /**
     * @param {string | string[]} components
     * @desc components is an string | string[] if is not passed this will return
     *            an observable which will look to the first component which locks the page
     *       if components is passed it will return an observable which will be true
     *            if a component is locked or false if all of them are unlocked
     * @returns {Observable<boolean>}
     */
    LockManagerService.prototype.listenTo = function (components) {
        var _this = this;
        if (components === void 0) { components = []; }
        var arrayStatus = this._util.mapToArray(components);
        return arrayStatus.length === 0
            ? this._managerLock$
                .map(function (managerMap) { return _this.getManagerLockedState(managerMap); })
                .debounceTime(0)
            : this._managerLock$
                .map(function (managerMap) { return _this.getManagerLockedSubspace(managerMap, arrayStatus); })
                .debounceTime(0);
    };
    /**
     * @desc if we use subscribe on a listenTo returned observable we need to unsubscribe it
     * @param {Subscription | Subscription[]} observables
     */
    LockManagerService.prototype.unListen = function (observables) {
        if (observables === void 0) { observables = []; }
        this._util.destroySubscription(observables);
    };
    /**
     * @desc A component should be removed from the lock manager so it will not mess up the lock state of the manager
     * @param {Subscription | Subscription[]} observables
     */
    LockManagerService.prototype.removeComponent = function (cmpId) {
        var latestStatus = !this._managerLock$.isStopped
            ? this._managerLock$.getValue()
            : {};
        if (latestStatus && latestStatus[cmpId]) {
            latestStatus = this._util.cloneObjectWithoutProps(latestStatus, [cmpId]);
        }
        this._managerLock$.next(latestStatus);
    };
    /**
     * Cleanup memory
     */
    LockManagerService.prototype.ngOnDestroy = function () {
        this._managerLock$.complete();
    };
    LockManagerService.prototype.dispatchStatus = function (newStatus, componentId, lockManager) {
        if (lockManager === void 0) { lockManager = false; }
        if (!lock_constants_1.LOCK_STATUS[newStatus] || !componentId) {
            return;
        }
        // get the observable model
        var appLockMap = !this._managerLock$.isStopped
            ? this._managerLock$.getValue()
            : {};
        appLockMap[componentId] = {
            status: newStatus,
            lockManager: lockManager
        };
        this._managerLock$.next(appLockMap);
    };
    /**
     * @param {LockStatus} managerMap
     * @returns true if in the manager is a component which lockes the whole manager
     */
    LockManagerService.prototype.getManagerLockedState = function (managerMap) {
        if (!this._util.isObject(managerMap)) {
            return false;
        }
        for (var cmpId in managerMap.components) {
            if (managerMap[cmpId] &&
                managerMap[cmpId].lockManager &&
                managerMap[cmpId].status === lock_constants_1.LOCK_STATUS.LOCKED) {
                return true;
            }
        }
        return false;
    };
    /**
     * @param {LockStatus} managerMap
     * @param {string[]} listenedComponents
     * @returns true if a component is locked or false if all the listend components are unlocked
     */
    LockManagerService.prototype.getManagerLockedSubspace = function (managerMap, listenedComponents) {
        for (var managerKey in managerMap) {
            if (managerMap[managerKey] &&
                managerMap[managerKey].status === lock_constants_1.LOCK_STATUS.LOCKED &&
                listenedComponents.indexOf(managerKey) !== -1) {
                return true;
            }
        }
        return false;
    };
    LockManagerService.prototype.startLogging = function () {
        var _this = this;
        this._managerLock$
            .subscribe(function (managerMap) {
            var val = {};
            for (var mapKey in managerMap) {
                if (_this._util.isObject(managerMap[mapKey])) {
                    val[mapKey] = __assign({}, managerMap[mapKey]);
                }
            }
            console.info("", val);
        });
    };
    LockManagerService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(ng_lock_system_module_1.ENABLE_LOGGING)),
        __metadata("design:paramtypes", [Boolean, util_service_1.UtilService])
    ], LockManagerService);
    return LockManagerService;
}());
exports.LockManagerService = LockManagerService;
