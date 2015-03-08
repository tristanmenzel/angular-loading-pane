(function(module) {
try {
  module = angular.module('loadingPane');
} catch (e) {
  module = angular.module('loadingPane', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('loading-pane.tpl.html',
    '<div class="loading-pane" ng-class="[tracker.complete === true ? \'lp-loaded\' : \'lp-loading\']" >\n' +
    '    <div class="lp-spinner">\n' +
    '        <div class="lp-spinner-icon"></div>\n' +
    '    </div>\n' +
    '    <div class="lp-content" ng-transclude></div>\n' +
    '</div>');
}]);
})();
