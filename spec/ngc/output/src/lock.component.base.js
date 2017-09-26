"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lock_manager_service_1 = require("./lock-manager.service");
var util_service_1 = require("./util.service");
var root_injector_const_1 = require("./root.injector.const");
var NgLockComponentBase = /** @class */ (function () {
    function NgLockComponentBase() {
        this.util = null;
        this.isLocked$ = null;
        this.isLocked = false;
        this._componentId = "";
        this._lockManager = null;
        this._lockSubscription = null;
        this._subscriptions = [];
        this.util = root_injector_const_1.RootServiceLocator.injector.get(util_service_1.UtilService);
        this._lockManager = root_injector_const_1.RootServiceLocator.injector.get(lock_manager_service_1.LockManagerService);
        this.setComponentId(this.util.getId());
        this.setNgOnDestroyHook();
    }
    NgLockComponentBase.prototype.setComponentId = function (componentId) {
        this._componentId = componentId;
        this.isLocked$ = this._lockManager.listenTo(this._componentId).debounceTime(0);
        if (this._lockSubscription) {
            this.unWrapLockSubscription();
        }
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
            ? this._lockManager.lockComponent(this._componentId, managerBusy)
            : this._lockManager.unlockComponent(this._componentId);
    };
    NgLockComponentBase.prototype.addSubscription = function (s) {
        this._subscriptions.push(s);
    };
    NgLockComponentBase.prototype.cleanupData = function () {
        this._lockManager.unListen(this._lockSubscription);
        this._lockManager.removeComponent(this._componentId);
        this._lockManager.unListen(this._subscriptions);
    };
    NgLockComponentBase.prototype.setNgOnDestroyHook = function () {
        var _this = this;
        var old = function () {
        };
        if (this.util.isFunction(this["ngOnDestroy"])) {
            old = this["ngOnDestroy"].bind(this);
        }
        this["ngOnDestroy"] = function () {
            old();
            _this.cleanupData();
        };
    };
    return NgLockComponentBase;
}());
exports.NgLockComponentBase = NgLockComponentBase;
