import { NgModule, Injector, OpaqueToken } from "@angular/core";
import { LockManagerService } from "./lock-manager.service";
import { RootServiceLocator } from "./root.injector.const";
import { UtilService } from "./util.service";

export let ENABLE_LOGGING = new OpaqueToken("ENABLE_LOGGING");

export function provideLockSystem(enableLogging) {
    return [
        UtilService,
        LockManagerService,
        {provide: ENABLE_LOGGING, useValue: enableLogging}
    ];
}

@NgModule({})
export class NgLockSystemModule {
    constructor(private appInjector: Injector) {
        RootServiceLocator.injector = appInjector;
    }

    provideLockSystem(enableLogging: boolean = false) {
        return {
            ngModule: NgLockSystemModule,
            providers: provideLockSystem(enableLogging)
        };
    }
}
