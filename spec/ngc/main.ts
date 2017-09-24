import { NgModule, Component } from '@angular/core';
import { platformDynamicServer } from '@angular/platform-server';
import { BrowserModule } from '@angular/platform-browser';
import { counterReducer, INCREMENT, DECREMENT } from '../fixtures/counter';
import { Observable } from 'rxjs/Observable';
import { NgLockSystemModule } from "../../src/ng-lock-system.module";
import { NgLockComponentBase } from "../../src/lock.component.base";

export interface AppState {
    count: number;
}

export const storeConfig = {count: counterReducer};
export const initialState = {count: 0};

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
