# angular-loading-pane
A simple loading pane implementation for angular based on promises.

##Install
`bower install angular-loading-pane`

##Usage
**Include css**

```html
<link rel="stylesheet" href="/bower_components/angular-loading-pane/dist/loading-pane.min.css" />
```

**Include js**

```html
<script src="/bower_components/angular-loading-pane/dist/loading-pane.min.js" />
```

**Add module dependency**

```javascript
angular.module('app', ['loadingPane'])`
```

**Create an instance of the tracker object on your view model**

```javascript
angular.module('app').controller('MyCtrl', function(loading){
    var vm = this;
    // Tracker with default params
    vm.tracker = loading.createTracker();
    
    // Tracker with initial state of incomplete (default is complete)
    vm.tracker2 = loading.createTracker(false);
     
    // Tracker with minimum delay of 1s. Loader will spin for at least 1s even if the promise is complete
    // (default is 0)
    vm.tracker3 = loading.createTracker(true, 1000);  
}
```

**Use the tracker to track long running promises**

```javascript
...
vm.doThing = function(){
    // Track a single promise
    vm.tracker.track($http.get('http://www.google.com'));
}

vm.doTwoThings = function(){
    // Track multiple promises (will wait till all promises complete)
    var d1 = $q.defer(),
        d2 = $q.defer();
    $timeout(function () {
        d1.resolve(true);
    }, 100);
    $timeout(function () {
        d2.resolve(true);
    }, 4000);
    vm.tracker2.track(d1.promise);
    vm.tracker2.track(d2.promise);
};
...
```

**Insert loading-pane directive into your markup where ever you want to hide the UI**

```html
<div ng-app="app" ng-controller="MyCtrl as vm">
  <loading-pane tracker="vm.tracker">
    <h1>My Page</h1>
    <button ng-click="vm.doThing()">Do thing</button>
  </loading-pane>
</div>
```
