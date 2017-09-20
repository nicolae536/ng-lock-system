# ng-lock-system

### A simple repository which helps you to have a lock system over your application components or the application state

### Features
1. Any component which extends NgLockComponentBase will be added to the lock system
2. NgLockComponentBase will cleanup it's data after each ngOnDestry

### Usage
1. Install `npm install --save ng-lock-system`
2. Add to app root imports
```
@NgModule({
    imports: [NgLockSystemModule.provideLockSystem(
    true | false // enable logging
    )]
})
export class AppRootModule {}
```
3. Use the lock system inside a component
```

@Component({
    selector: "my-cmp",
    // The locked observable will always reflect the correct value
    template: "is Locked {{isLocked$ | async}}"
})
export class MyCmp extends NgLockComponentBase {
    // isLocked$ => is an Observable<boolean> from the base class which should be true if the component is locked (do not subscribe to this subscription unless you unsubscribe from it manually)
    // isLocked => boolean from the base class it will not reflect the observable value only if we call this function `this.unWrapLockSubscription()` which creates a subscription to isLocked$ Observable, this subscription will be cleaned up after on destroy cycle
    constructor() {
        super();
    }
    
    markAsBusyComponent() {
        this.busy();
        console.log("is Locked ", this.isLocked) => will write false
        setTimeout(() => {
            this.busy(false);
            console.log("is Locked ", this.isLocked) => will write false
        }, 500);
    }
    
    markAsBusyWithObservableUnwraped() {
        this.unWrapLockSubscription(); // call this fuction only once
        this.busy();
        console.log("is Locked ", this.isLocked) => will write true
        setTimeout(() => {
            this.busy(false);
            console.log("is Locked ", this.isLocked) => will write false
        }, 500);
    }
    
    // The base class assignes to the component unique id to identify it
    // if you want to change the id you can do that like this
    markAsBusyWithChangedIf() {
        this.unWrapLockSubscription();
        // you can call this.unWrapLockSubscription(); before changing the component id
        // the subscription will update with the new subscription based on the new id           
        this.setComponentId("My_Favorite_Component");
        this.busy();
        console.log("is Locked ", this.isLocked) => will write true
        setTimeout(() => {
            this.busy(false);
            console.log("is Locked ", this.isLocked) => will write false
        }, 500);
    }
}
```
4. Use  LockManagerService
```
@Component({
    selector: "my-cmp",
    template: "is Locked {{isLocked$ | async}}"
})
export class MyCmp {
    isLocked$: Observable<boolean>;
    constructor(private lockManager: LockManagerService) {
        this.isLocked$ = this.lockManager.listenTo(); // listen to manager to full state 
        // the value will be true if a components will lock the whole manager
        // and false otherwise
        // the lock manager is a Dictionary<{ status: string, lockManager: boolean }>
        // lockManager affects the manager state 
        // status lets us to lock single components to not affect the over all state
        // for example I have a list component and it should be locked while I read data from the server I can use lockManager -> true and have a lock over all app 
        //or just lock the simple component
        
        this.isLocked$ = this.lockManager.listenTo("MY_COMPONENT_ID"); // listen to one component (true if component is locked, false otherwise)
        this.isLocked$ = this.lockManager.listenTo([
        "MY_COMPONENT_ID",
        "MY_SECOND_COMPONENT_ID",
        "MY_THIRE_COMPONENT_ID"
        ]); // listen to multiple component id's  (true if one component is locked, false otherwise)
        
        this.lockManager.lockComponent("MY_COMPONENT_ID");
        this.lockManager.lockComponent(
            "MY_COMPONENT_ID", 
            true // mark app as locked
        );
        this.lockManager.unlockComponent(
            "MY_COMPONENT_ID" // mark the components as unlocked
        );
        
        let subs = this.lockManager.listenTo("MY_COMPONENT_ID").subscribe(v => console.log(v));
        // To clean up the subscription you can call
        this.lockManager.unListen(subs); // subs can be an array of subscriptions
        // It will take out the component from the lock dictionary
        this.lockManager.removeComponent("MY_COMPONENT_ID");
    }
```

### In progress, planned, and non-planned features
1. Add automated tests for the service
2. Make the api as friendly as possible
