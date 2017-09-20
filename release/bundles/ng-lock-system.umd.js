(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/BehaviorSubject'), require('rxjs/add/operator/map'), require('rxjs/add/operator/debounceTime')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/BehaviorSubject', 'rxjs/add/operator/map', 'rxjs/add/operator/debounceTime'], factory) :
    (factory((global.ng = global.ng || {}, global.ng.lock = global.ng.lock || {}, global.ng.lock.system = global.ng.lock.system || {}),global.ng.core,global.Rx,global.Rx.Observable.prototype,global.Rx.Observable.prototype));
}(this, (function (exports,_angular_core,rxjs_BehaviorSubject,rxjs_add_operator_map,rxjs_add_operator_debounceTime) { 'use strict';

var LOCK_STATUS = {
    LOCKED: "LOCKED",
    UNLOCKED: "UNLOCKED",
};

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UtilService = /** @class */ (function () {
    function UtilService() {
    }
    UtilService.prototype.destroySubscription = function (s) {
        if (this.isNullOrUndefined(s)) {
            return;
        }
        var arr = this.mapToArray(s);
        var numberOfSubscriptionsRemained = 0;
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var subs = arr_1[_i];
            if (this.isNullOrUndefined(s) ||
                !this.isSubscription(subs)) {
                numberOfSubscriptionsRemained++;
                continue;
            }
            subs.unsubscribe();
        }
        return numberOfSubscriptionsRemained;
    };
    UtilService.prototype.cloneObjectWithoutProps = function (value, omitProps) {
        if (omitProps === void 0) { omitProps = []; }
        if (this.isNullOrUndefined(value) ||
            !this.isObject(value)) {
            return;
        }
        var oProps = this.mapToArray(omitProps);
        var retVal = {};
        for (var key in value) {
            if (oProps.indexOf(key) !== -1) {
                continue;
            }
            retVal[key] = value[key];
        }
        return retVal;
    };
    UtilService.prototype.isNullOrUndefined = function (value) {
        return value === null || value === undefined;
    };
    UtilService.prototype.mapToArray = function (value) {
        if (Array.isArray(value)) {
            return value;
        }
        return [value];
    };
    UtilService.prototype.isSubscription = function (subs) {
        return subs && subs.unsubscribe;
    };
    UtilService.prototype.isObject = function (subs) {
        return this.isInstanceOf(Object, subs);
    };
    UtilService.prototype.isInstanceOf = function (typeClass, value) {
        return value instanceof typeClass;
    };
    UtilService.prototype.getId = function () {
        return this.getFourRandomChars() + this.getFourRandomChars() + "-" +
            this.getFourRandomChars() + "-" +
            this.getFourRandomChars() + "-" +
            this.getFourRandomChars() + "-" +
            this.getFourRandomChars() + this.getFourRandomChars() + this.getFourRandomChars();
    };
    UtilService.prototype.getFourRandomChars = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    UtilService = __decorate([
        _angular_core.Injectable()
    ], UtilService);
    return UtilService;
}());

var RootServiceLocator = /** @class */ (function () {
    function RootServiceLocator() {
    }
    return RootServiceLocator;
}());

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ENABLE_LOGGING = new _angular_core.OpaqueToken("ENABLE_LOGGING");
function provideLockSystem(enableLogging) {
    return [
        UtilService,
        LockManagerService,
        { provide: ENABLE_LOGGING, useValue: enableLogging }
    ];
}
var NgLockSystemModule = /** @class */ (function () {
    function NgLockSystemModule(appInjector) {
        this.appInjector = appInjector;
        RootServiceLocator.injector = appInjector;
    }
    NgLockSystemModule_1 = NgLockSystemModule;
    NgLockSystemModule.prototype.provideLockSystem = function (enableLogging) {
        if (enableLogging === void 0) { enableLogging = false; }
        return {
            ngModule: NgLockSystemModule_1,
            providers: provideLockSystem(enableLogging)
        };
    };
    NgLockSystemModule = NgLockSystemModule_1 = __decorate$2([
        _angular_core.NgModule({}),
        __metadata$1("design:paramtypes", [_angular_core.Injector])
    ], NgLockSystemModule);
    return NgLockSystemModule;
    var NgLockSystemModule_1;
}());

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var LockManagerService = /** @class */ (function () {
    function LockManagerService(enableLogging, _util) {
        this._util = _util;
        this._managerLock$ = new rxjs_BehaviorSubject.BehaviorSubject({});
        if (enableLogging) {
            this.startLogging();
        }
    }
    /**
     * @desc  sets the componentId as locked inside the _managerLock$ observable
     * @param {string} componentId
     * @param {boolean} lockManager if passed with true this will mark the manager as locked
     */
    LockManagerService.prototype.lockManager = function (componentId, lockManager) {
        if (lockManager === void 0) { lockManager = false; }
        this.dispatchStatus(LOCK_STATUS.LOCKED, componentId, lockManager);
    };
    /**
     * @desc  sets the componentId as unlocked inside the _managerLock$ observable we automatically mark the lockManager as false
     * @param {string} componentId
     */
    LockManagerService.prototype.unlockManager = function (componentId) {
        this.dispatchStatus(LOCK_STATUS.UNLOCKED, componentId, false);
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
        if (!LOCK_STATUS[newStatus] || !componentId) {
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
                managerMap[cmpId].status === LOCK_STATUS.LOCKED) {
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
                managerMap[managerKey].status === LOCK_STATUS.LOCKED &&
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
    LockManagerService = __decorate$1([
        _angular_core.Injectable(),
        __param(0, _angular_core.Inject(ENABLE_LOGGING)),
        __metadata("design:paramtypes", [Boolean, UtilService])
    ], LockManagerService);
    return LockManagerService;
}());

function AfterOnDestroy() {
    return function (target, key) {
        var oldNgOnDestroy = target.ngOnDestroy;
        target.ngOnDestroy = function () {
            if (oldNgOnDestroy) {
                oldNgOnDestroy();
            }
            if (target[key] instanceof Function) {
                target[key]();
            }
        };
    };
}

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NgLockComponentBase = /** @class */ (function () {
    function NgLockComponentBase() {
        this.util = null;
        this.isLocked$ = null;
        this.isLocked = false;
        this._componentId = "";
        this._lockManager = null;
        this._lockSubscription = null;
        this._subscriptions = [];
        this.util = RootServiceLocator.injector.get(UtilService);
        this._lockManager = RootServiceLocator.injector.get(LockManagerService);
        this.setComponentId(this.util.getId());
    }
    NgLockComponentBase.prototype.setComponentId = function (componentId) {
        this._componentId = componentId;
        this.isLocked$ = this._lockManager.listenTo(this._componentId);
    };
    NgLockComponentBase.prototype.unWrapLockSubscription = function () {
        var _this = this;
        if (this._lockSubscription) {
            this._lockManager.unListen(this._lockSubscription);
        }
        if (!this.isLocked$ || !this.isLocked$.subscribe) {
            return;
        }
        this._lockSubscription = this.isLocked$.subscribe(function (isLocked) { return _this.isLocked = isLocked; });
    };
    NgLockComponentBase.prototype.busyManager = function (value) {
        if (value === void 0) { value = true; }
        this.busy(value, value);
    };
    NgLockComponentBase.prototype.busy = function (value, managerBusy) {
        if (value === void 0) { value = true; }
        if (managerBusy === void 0) { managerBusy = false; }
        value
            ? this._lockManager.lockManager(this._componentId, managerBusy)
            : this._lockManager.unlockManager(this._componentId);
    };
    NgLockComponentBase.prototype.addSubscription = function (s) {
        this._subscriptions.push(s);
    };
    NgLockComponentBase.prototype.cleanupData = function () {
        this._lockManager.unListen(this._lockSubscription);
        this._lockManager.removeComponent(this._componentId);
        this._lockManager.unListen(this._subscriptions);
    };
    __decorate$3([
        AfterOnDestroy(),
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", []),
        __metadata$2("design:returntype", void 0)
    ], NgLockComponentBase.prototype, "cleanupData", null);
    return NgLockComponentBase;
}());

exports.LOCK_STATUS = LOCK_STATUS;
exports.UtilService = UtilService;
exports.LockManagerService = LockManagerService;
exports.NgLockComponentBase = NgLockComponentBase;
exports.ENABLE_LOGGING = ENABLE_LOGGING;
exports.provideLockSystem = provideLockSystem;
exports.NgLockSystemModule = NgLockSystemModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));