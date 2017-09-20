export function AfterOnDestroy() {
    return function (target: any, key: string) {
        const oldNgOnDestroy = target.ngOnDestroy;
        target.ngOnDestroy = () => {
            if (oldNgOnDestroy) {
                oldNgOnDestroy();
            }

            if (target[key] instanceof Function) {
                target[key]();
            }
        };
    };
}