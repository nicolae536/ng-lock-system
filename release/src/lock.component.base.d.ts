import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { UtilService } from "./util.service";
export declare class NgLockComponentBase {
    protected util: UtilService;
    protected isLocked$: Observable<boolean>;
    protected isLocked: boolean;
    private _componentId;
    private _lockManager;
    private _lockSubscription;
    private _subscriptions;
    constructor();
    setComponentId(componentId: string): void;
    unWrapLockSubscription(): void;
    busyManager(value?: boolean): void;
    busy(value?: boolean, managerBusy?: boolean): void;
    addSubscription(s: Subscription): void;
    cleanupData(): void;
}
