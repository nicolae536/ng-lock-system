"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var platform_browser_1 = require("@angular/platform-browser");
var counter_1 = require("../fixtures/counter");
var ng_lock_system_module_1 = require("../../src/ng-lock-system.module");
var lock_component_base_1 = require("../../src/lock.component.base");
exports.storeConfig = { count: counter_1.counterReducer };
exports.initialState = { count: 0 };
var NgcSpecComponent = /** @class */ (function (_super) {
    __extends(NgcSpecComponent, _super);
    function NgcSpecComponent() {
        return _super.call(this) || this;
    }
    NgcSpecComponent.prototype.lock = function () {
        this.busy();
    };
    NgcSpecComponent.prototype.unlock = function () {
        this.busy(false);
    };
    NgcSpecComponent = __decorate([
        core_1.Component({
            selector: 'ngc-spec-component',
            template: "\n        <div [style.background-color]=\"(isLocked$ | async) ? 'red' : 'black'\"></div>\n        <button click=\"lock()\">Lock</button>\n        <button click=\"unlock()\">Unlock</button>\n    "
        }),
        __metadata("design:paramtypes", [])
    ], NgcSpecComponent);
    return NgcSpecComponent;
}(lock_component_base_1.NgLockComponentBase));
exports.NgcSpecComponent = NgcSpecComponent;
var NgcSpecModule = /** @class */ (function () {
    function NgcSpecModule() {
    }
    NgcSpecModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                ng_lock_system_module_1.NgLockSystemModule.provideLockSystem(true)
            ],
            declarations: [NgcSpecComponent],
            bootstrap: [NgcSpecComponent]
        })
    ], NgcSpecModule);
    return NgcSpecModule;
}());
exports.NgcSpecModule = NgcSpecModule;
