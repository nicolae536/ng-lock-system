var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from "@angular/core";
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
        Injectable()
    ], UtilService);
    return UtilService;
}());
export { UtilService };
//# sourceMappingURL=util.service.js.map