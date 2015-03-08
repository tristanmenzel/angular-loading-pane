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
    vm.tracker = loading.createTracker();
}
```

**Use the tracker to track long running promises**

```javascript
...
vm.doThing = function(){
  vm.tracker.track($http.get('http://www.google.com'));
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
