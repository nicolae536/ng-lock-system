import { Injector, OpaqueToken } from "@angular/core";
import { LockManagerService } from "./lock-manager.service";
import { UtilService } from "./util.service";
export declare let ENABLE_LOGGING: OpaqueToken;
export declare function provideLockSystem(enableLogging: any): (typeof UtilService | typeof LockManagerService | {
    provide: OpaqueToken;
    useValue: any;
})[];
export declare class NgLockSystemModule {
    private appInjector;
    constructor(appInjector: Injector);
    provideLockSystem(enableLogging?: boolean): {
        ngModule: typeof NgLockSystemModule;
        providers: (typeof UtilService | typeof LockManagerService | {
            provide: OpaqueToken;
            useValue: any;
        })[];
    };
}
