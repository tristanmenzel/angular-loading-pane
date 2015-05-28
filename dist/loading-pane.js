angular.module('loadingPane', [])
    .directive('loadingPane', [function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {tracker: '='},
            templateUrl: 'loading-pane.tpl.html'
        };
    }])
    .factory('loading', ['$q', '$timeout', function ($q, $timeout) {
        function WorkTracker(isComplete, minDelayInMs) {
            var self = this;
            self.complete = isComplete;
            self.activePromises = 0;
            self.track = function (promise) {
                self.complete = false;
                self.activePromises++;
                if (minDelayInMs === 0) {
                    return promise.finally(self.completePromise);
                } else {
                    return $q.all([promise, $timeout(function () {
                    }, minDelayInMs)])
                        .finally(self.completePromise);
                }
            };

            self.completePromise = function () {
                self.activePromises = Math.max(0, self.activePromises - 1);
                self.complete = self.activePromises === 0;
            };
        }

        return {
            createTracker: function (isComplete, minDelayInMs) {
                return new WorkTracker(isComplete !== false, minDelayInMs || 0);
            }
        };
    }]);
