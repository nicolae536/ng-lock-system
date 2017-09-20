var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AfterOnDestroy } from "./decorators";
import { LockManagerService } from "./lock-manager.service";
import { UtilService } from "./util.service";
import { RootServiceLocator } from "./root.injector.const";
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
    __decorate([
        AfterOnDestroy(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NgLockComponentBase.prototype, "cleanupData", null);
    return NgLockComponentBase;
}());
export { NgLockComponentBase };
//# sourceMappingURL=lock.component.base.js.map