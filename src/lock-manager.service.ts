import { Injectable, OnDestroy, Inject } from "@angular/core";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { LOCK_STATUS, ComponentsLockMap } from "./lock.constants";
import { ENABLE_LOGGING } from "./ng-lock-system.module";
import { UtilService } from "./util.service";

@Injectable()
export class LockManagerService implements OnDestroy {
    private _managerLock$: BehaviorSubject<ComponentsLockMap> = new BehaviorSubject<ComponentsLockMap>({});

    constructor(@Inject(ENABLE_LOGGING) enableLogging: boolean,
                private _util: UtilService) {
        if (enableLogging) {
            this.startLogging();
        }
    }

    /**
     * @desc  sets the componentId as locked inside the _managerLock$ observable
     * @param {string} componentId
     * @param {boolean} lockManager if passed with true this will mark the manager as locked
     */
    lockComponent(componentId?: string, lockManager: boolean = false) {
        this.dispatchStatus(LOCK_STATUS.LOCKED, componentId, lockManager);
    }

    /**
     * @desc  sets the componentId as unlocked inside the _managerLock$ observable we automatically mark the lockComponent as false
     * @param {string} componentId
     */
    unlockComponent(componentId?: string) {
        this.dispatchStatus(LOCK_STATUS.UNLOCKED, componentId, false);
    }

    /**
     * @param {string | string[]} components
     * @desc components is an string | string[] if is not passed this will return
     *            an observable which will look to the first component which locks the page
     *       if components is passed it will return an observable which will be true
     *            if a component is locked or false if all of them are unlocked
     * @returns {Observable<boolean>}
     */
    listenTo(components: string | string[] = []): Observable<boolean> {
        const arrayStatus = this._util.mapToArray<string>(components);

        return arrayStatus.length === 0
            ? this._managerLock$
                .map(managerMap => this.getManagerLockedState(managerMap))
            : this._managerLock$
                .map(managerMap => this.getManagerLockedSubspace(managerMap, arrayStatus));
    }

    /**
     * @desc if we use subscribe on a listenTo returned observable we need to unsubscribe it
     * @param {Subscription | Subscription[]} observables
     */
    unListen(observables: Subscription | Subscription[] = []) {
        this._util.destroySubscription(observables);
    }

    /**
     * @desc A component should be removed from the lock manager so it will not mess up the lock state of the manager
     * @param {Subscription | Subscription[]} observables
     */
    removeComponent(cmpId: string) {
        let latestStatus = !this._managerLock$.isStopped
            ? this._managerLock$.getValue()
            : {};

        if (latestStatus && latestStatus[cmpId]) {
            latestStatus = this._util.cloneObjectWithoutProps<ComponentsLockMap>(latestStatus, [cmpId]);
        }

        this._managerLock$.next(latestStatus);
    }

    /**
     * Cleanup memory
     */
    ngOnDestroy(): void {
        this._managerLock$.complete();
    }

    private dispatchStatus(newStatus: string, componentId?: string, lockManager: boolean = false) {
        if (!LOCK_STATUS[newStatus] || !componentId) {
            return;
        }

        // get the observable model
        const appLockMap = !this._managerLock$.isStopped
            ? this._managerLock$.getValue()
            : {};


        appLockMap[componentId] = {
            status: newStatus,
            lockManager: lockManager
        };
        this._managerLock$.next(appLockMap);
    }

    /**
     * @param {LockStatus} managerMap
     * @returns true if in the manager is a component which lockes the whole manager
     */
    private getManagerLockedState(managerMap: ComponentsLockMap): boolean {
        if (!this._util.isObject(managerMap)) {
            return false;
        }

        for (const cmpId in managerMap) {
            if (managerMap[cmpId] &&
                managerMap[cmpId].lockManager &&
                managerMap[cmpId].status === LOCK_STATUS.LOCKED) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param {LockStatus} managerMap
     * @param {string[]} listenedComponents
     * @returns true if a component is locked or false if all the listend components are unlocked
     */
    private getManagerLockedSubspace(managerMap: ComponentsLockMap, listenedComponents: string[]): boolean {
        for (const managerKey in managerMap) {
            if (managerMap[managerKey] &&
                managerMap[managerKey].status === LOCK_STATUS.LOCKED &&
                listenedComponents.indexOf(managerKey) !== -1) {

                return true;
            }
        }

        return false;
    }

    private startLogging() {
        this._managerLock$
            .subscribe(managerMap => {
                const val = {};
                for (const mapKey in managerMap) {
                    if (this._util.isObject(managerMap[mapKey])) {
                        val[mapKey] = {...managerMap[mapKey]};
                    }
                }
                console.info("", val);
            });
    }
}
