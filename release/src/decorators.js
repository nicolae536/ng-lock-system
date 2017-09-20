export function AfterOnDestroy() {
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
//# sourceMappingURL=decorators.js.map