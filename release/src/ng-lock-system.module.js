var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Injector, OpaqueToken } from "@angular/core";
import { LockManagerService } from "./lock-manager.service";
import { RootServiceLocator } from "./root.injector.const";
import { UtilService } from "./util.service";
export var ENABLE_LOGGING = new OpaqueToken("ENABLE_LOGGING");
export function provideLockSystem(enableLogging) {
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
    NgLockSystemModule = NgLockSystemModule_1 = __decorate([
        NgModule({}),
        __metadata("design:paramtypes", [Injector])
    ], NgLockSystemModule);
    return NgLockSystemModule;
    var NgLockSystemModule_1;
}());
export { NgLockSystemModule };
//# sourceMappingURL=ng-lock-system.module.js.map