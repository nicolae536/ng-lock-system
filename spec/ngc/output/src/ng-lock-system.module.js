"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var lock_manager_service_1 = require("./lock-manager.service");
var root_injector_const_1 = require("./root.injector.const");
var util_service_1 = require("./util.service");
exports.ENABLE_LOGGING = new core_1.OpaqueToken("ENABLE_LOGGING");
function provideLockSystem(enableLogging) {
    return [
        util_service_1.UtilService,
        lock_manager_service_1.LockManagerService,
        { provide: exports.ENABLE_LOGGING, useValue: enableLogging || false }
    ];
}
exports.provideLockSystem = provideLockSystem;
var NgLockSystemModule = /** @class */ (function () {
    function NgLockSystemModule(appInjector) {
        this.appInjector = appInjector;
        root_injector_const_1.RootServiceLocator.injector = appInjector;
    }
    NgLockSystemModule_1 = NgLockSystemModule;
    NgLockSystemModule.provideLockSystem = function (enableLogging) {
        if (enableLogging === void 0) { enableLogging = false; }
        return {
            ngModule: NgLockSystemModule_1,
            providers: provideLockSystem(enableLogging)
        };
    };
    NgLockSystemModule = NgLockSystemModule_1 = __decorate([
        core_1.NgModule({}),
        __metadata("design:paramtypes", [core_1.Injector])
    ], NgLockSystemModule);
    return NgLockSystemModule;
    var NgLockSystemModule_1;
}());
exports.NgLockSystemModule = NgLockSystemModule;
