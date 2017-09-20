import { OnDestroy } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { UtilService } from "./util.service";
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
export declare class LockManagerService implements OnDestroy {
    private _util;
    private _managerLock$;
    constructor(enableLogging: boolean, _util: UtilService);
    /**
     * @desc  sets the componentId as locked inside the _managerLock$ observable
     * @param {string} componentId
     * @param {boolean} lockManager if passed with true this will mark the manager as locked
     */
    lockManager(componentId?: string, lockManager?: boolean): void;
    /**
     * @desc  sets the componentId as unlocked inside the _managerLock$ observable we automatically mark the lockManager as false
     * @param {string} componentId
     */
    unlockManager(componentId?: string): void;
    /**
     * @param {string | string[]} components
     * @desc components is an string | string[] if is not passed this will return
     *            an observable which will look to the first component which locks the page
     *       if components is passed it will return an observable which will be true
     *            if a component is locked or false if all of them are unlocked
     * @returns {Observable<boolean>}
     */
    listenTo(components?: string | string[]): Observable<boolean>;
    /**
     * @desc if we use subscribe on a listenTo returned observable we need to unsubscribe it
     * @param {Subscription | Subscription[]} observables
     */
    unListen(observables?: Subscription | Subscription[]): void;
    /**
     * @desc A component should be removed from the lock manager so it will not mess up the lock state of the manager
     * @param {Subscription | Subscription[]} observables
     */
    removeComponent(cmpId: string): void;
    /**
     * Cleanup memory
     */
    ngOnDestroy(): void;
    private dispatchStatus(newStatus, componentId?, lockManager?);
    /**
     * @param {LockStatus} managerMap
     * @returns true if in the manager is a component which lockes the whole manager
     */
    private getManagerLockedState(managerMap);
    /**
     * @param {LockStatus} managerMap
     * @param {string[]} listenedComponents
     * @returns true if a component is locked or false if all the listend components are unlocked
     */
    private getManagerLockedSubspace(managerMap, listenedComponents);
    private startLogging();
}
