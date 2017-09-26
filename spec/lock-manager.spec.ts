import { ReflectiveInjector } from '@angular/core';
import { LockManagerService, NgLockSystemModule } from "../";
import { expectObservable, hot } from "./helpers/marble-testing";

describe('ngLockSystem Lock manager service', () => {

    describe('basic Lock manager actions', function () {
        let injector: ReflectiveInjector;
        let lockManager: LockManagerService;

        beforeEach(() => {
            const initialValue = {counter1: 0, counter2: 1};

            injector = ReflectiveInjector.resolveAndCreate([
                NgLockSystemModule.provideLockSystem(false).providers
            ]);

            lockManager = injector.get(LockManagerService);
        });

        it('should provide a lock manager service', () => {
            expect(lockManager).toBeDefined();
        });

        it('should lock and unlock a component with a given id', () => {
            let emitSequence = hot("--a--b--c", {a: true, b: false, c: true});
            emitSequence.subscribe((action) => {
                action
                    ? lockManager.lockComponent("MY_CMP_ID")
                    : lockManager.unlockComponent("MY_CMP_ID")

            });
            const stateSequence = 'x-a--b--c';
            const cmpSelector = lockManager.listenTo("MY_CMP_ID");
            const expectedValuesOnStates = {x: false, a: true, b: false, c: true};
            expectObservable(cmpSelector)
                .toBe(stateSequence, expectedValuesOnStates)
        });

        it('should lock and unlock components but not always lock the manager state', () => {
            let emitSequence = hot("--a--b--c", {a: {value: true, lockFullApp: true}, b: {value: false}, c: {value: true, lockFullApp: false}});
            emitSequence.subscribe((action) => {
                action.value
                    ? lockManager.lockComponent("MY_CMP_ID", action.lockFullApp)
                    : lockManager.unlockComponent("MY_CMP_ID")

            });
            const stateSequence = 'x-a--b--c';
            const managerSelector = lockManager.listenTo();
            const expectedValuesOnManagerStates = {x: false, a: true, b: false, c: false};
            const cmpSelector = lockManager.listenTo("MY_CMP_ID");
            const expectedValuesOnCmpStates = {x: false, a: true, b: false, c: true};

            expectObservable(managerSelector)
                .toBe(stateSequence, expectedValuesOnManagerStates);
            expectObservable(cmpSelector)
                .toBe(stateSequence, expectedValuesOnCmpStates);
        });
    });
});