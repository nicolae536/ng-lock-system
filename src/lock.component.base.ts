import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { LockManagerService } from "./lock-manager.service";
import { UtilService } from "./util.service";
import { RootServiceLocator } from "./root.injector.const";

export class NgLockComponentBase {
    public util: UtilService = null;
    public isLocked$: Observable<boolean> = null;
    public isLocked: boolean = false;
    public lockManager: LockManagerService = null;

    private _componentId: string = "";
    private _lockSubscription: Subscription = null;
    private _subscriptions: Subscription[] = [];

    constructor() {
        this.util = RootServiceLocator.injector.get(UtilService);
        this.lockManager = RootServiceLocator.injector.get(LockManagerService);
        this.setComponentId(this.util.getId());
        this.setNgOnDestroyHook();
    }

    setComponentId(componentId: string) {
        this._componentId = componentId;
        this.isLocked$ = this.lockManager.listenTo(this._componentId).debounceTime(0);

        if (this._lockSubscription) {
            this.unWrapLockSubscription();
        }
    }

    unWrapLockSubscription() {
        if (this._lockSubscription) {
            this.lockManager.unListen(this._lockSubscription);
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
            ? this.lockManager.lockComponent(this._componentId, managerBusy)
            : this.lockManager.unlockComponent(this._componentId);
    }

    addSubscription(s: Subscription) {
        this._subscriptions.push(s);
    }

    cleanupData() {
        this.lockManager.unListen(this._lockSubscription);
        this.lockManager.removeComponent(this._componentId);
        this.lockManager.unListen(this._subscriptions);
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
