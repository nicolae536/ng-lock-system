import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { LockManagerService } from "./lock-manager.service";
import { UtilService } from "./util.service";
import { RootServiceLocator } from "./root.injector.const";

export class NgLockComponentBase {
    protected util: UtilService = null;
    protected isLocked$: Observable<boolean> = null;
    protected isLocked: boolean = false;

    private _componentId: string = "";
    private _lockManager: LockManagerService = null;
    private _lockSubscription: Subscription = null;
    private _subscriptions: Subscription[] = [];

    constructor() {
        this.util = RootServiceLocator.injector.get(UtilService);
        this._lockManager = RootServiceLocator.injector.get(LockManagerService);
        this.setComponentId(this.util.getId());
        this.setNgOnDestroyHook();
    }

    setComponentId(componentId: string) {
        this._componentId = componentId;
        this.isLocked$ = this._lockManager.listenTo(this._componentId);

        if (this._lockSubscription) {
            this.unWrapLockSubscription();
        }
    }

    unWrapLockSubscription() {
        if (this._lockSubscription) {
            this._lockManager.unListen(this._lockSubscription);
        }

        if (!this.isLocked$ || !this.isLocked$.subscribe) {
            return;
        }

        this._lockSubscription = this.isLocked$.subscribe(isLocked => this.isLocked = isLocked);
    }

    busyManager(value: boolean = true) {
        this.busy(value, value);
    }

    busy(value: boolean = true, managerBusy: boolean = false) {
        value
            ? this._lockManager.lockComponent(this._componentId, managerBusy)
            : this._lockManager.unlockComponent(this._componentId);
    }

    addSubscription(s: Subscription) {
        this._subscriptions.push(s);
    }

    cleanupData() {
        this._lockManager.unListen(this._lockSubscription);
        this._lockManager.removeComponent(this._componentId);
        this._lockManager.unListen(this._subscriptions);
    }

    private setNgOnDestroyHook() {
        let old = () => {
        };
        if (this.util.isFunction(this["ngOnDestroy"])) {
            old = this["ngOnDestroy"].bind(this);
        }

        this["ngOnDestroy"] = () => {
            old();
            this.cleanupData();
        }
    }
}
