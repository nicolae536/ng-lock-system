export default {
    entry: "./release/index.js",
    dest: "./release/bundles/ng-lock-system.umd.js",
    format: "umd",
    moduleName: "ng.lock.system",
    globals: {
        "@angular/core": "ng.core",
        "rxjs/Observable": "Rx",
        "rxjs/BehaviorSubject": "Rx",
        "rxjs/Subscription": "Rx",
        "rxjs/add/operator/map": "Rx.Observable.prototype",
        "rxjs/add/operator/debounceTime": "Rx.Observable.prototype"
    }
}