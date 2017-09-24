import { NgModule, Injector, OpaqueToken } from "@angular/core";
import { LockManagerService } from "./lock-manager.service";
import { RootServiceLocator } from "./root.injector.const";
import { UtilService } from "./util.service";

export let ENABLE_LOGGING = new OpaqueToken("ENABLE_LOGGING");

export function provideLockSystem(enableLogging) {
    return [
        UtilService,
        LockManagerService,
        {provide: ENABLE_LOGGING, useValue: enableLogging || false}
    ];
}

@NgModule({})
export class NgLockSystemModule {
    constructor(private appInjector: Injector) {
        RootServiceLocator.injector = appInjector;
    }

    static provideLockSystem(enableLogging: boolean = false) {
        return {
            ngModule: NgLockSystemModule,
            providers: provideLockSystem(enableLogging)
        };
    }
}
