import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgLockComponentBase } from "../../src/lock.component.base";
import { NgLockSystemModule } from "../../src/ng-lock-system.module";


@Component({
    selector: 'ngc-spec-component',
    template: `
        <div [style.background-color]="(isLocked$ | async) ? 'red' : 'black'"></div>
        <button click="lock()">Lock</button>
        <button click="unlock()">Unlock</button>
    `
})
export class NgcSpecComponent extends NgLockComponentBase{
    constructor() {
        super()
    }

    lock() {
        this.busy();
    }

    unlock() {
        this.busy(false);
    }
}

@NgModule({
    imports: [
        BrowserModule,
        NgLockSystemModule.provideLockSystem(true)
    ],
    declarations: [NgcSpecComponent],
    bootstrap: [NgcSpecComponent]
})
export class NgcSpecModule {
}
