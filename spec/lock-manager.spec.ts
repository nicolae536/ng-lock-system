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

        it('should lock and unlock different components maintaining the full manager state', () => {
            let emitSequence = hot("--a--b--c--d--e--f", {
                a: {value: true, cmdId: "CMP_1", lockFullApp: true},
                b: {value: true, cmdId: "CMP_2"},
                c: {value: false, cmdId: "CMP_1"},
                d: {value: true, cmdId: "CMP_2", lockFullApp: true},
                e: {value: false, cmdId: "CMP_2"},
                f: {value: true, cmdId: "CMP_1"}
            });
            emitSequence.subscribe((action) => {
                action.value
                    ? lockManager.lockComponent(action.cmdId, action.lockFullApp)
                    : lockManager.unlockComponent(action.cmdId)

            });
            const stateSequence = 'x-a--b--c--d--e--f';
            const managerSelector = lockManager.listenTo();
            const expectedValuesOnManagerStates = {x: false, a: true, b: true, c: false, d: true, e: false, f: false};
            const cmp1Selector = lockManager.listenTo("CMP_1");
            const cmp2Selector = lockManager.listenTo("CMP_2");
            const expectedValuesOnCmp1States = {x: false, a: true, b: true, c: false, d: false, e: false, f: true};
            const expectedValuesOnCmp2States = {x: false, a: false, b: true, c: true, d: true, e: false, f: false};

            expectObservable(managerSelector)
                .toBe(stateSequence, expectedValuesOnManagerStates);
            expectObservable(cmp1Selector)
                .toBe(stateSequence, expectedValuesOnCmp1States);
            expectObservable(cmp2Selector)
                .toBe(stateSequence, expectedValuesOnCmp2States);
        });

        it('should unlock resources when a component wants to unListen to the manager lock states', () => {
            const managerSelector = lockManager.listenTo();
            const cmp1Selector = lockManager.listenTo("CMP_1");
            const cmp2Selector = lockManager.listenTo("CMP_2");

            let firstSubscription = managerSelector.subscribe(v => {
            });
            let secondSubscription = cmp1Selector.subscribe(v => {
            });
            let thirdSubscription = cmp2Selector.subscribe(v => {
            });

            expect(lockManager.let().observers.length).toBe(3);
            lockManager.unListen(firstSubscription);
            expect(lockManager.let().observers.length).toBe(2);
            lockManager.unListen(thirdSubscription);
            expect(lockManager.let().observers.length).toBe(1);
            lockManager.unListen(secondSubscription);
            expect(lockManager.let().observers.length).toBe(0);
            expect(lockManager.let().isStopped).toBe(false);
        })
    });
});