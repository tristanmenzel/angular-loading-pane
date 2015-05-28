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
    .factory('loading', [function () {
        function WorkTracker(isComplete) {
            var self = this;
            self.complete = isComplete !== false;
            self.activePromises = 0;
            self.track = function (promise) {
                self.complete = false;
                self.activePromises++;
                return promise.then(function () {
                    self.completePromise();
                }, function () {
                    self.completePromise();
                });
            };

            self.completePromise = function () {
                self.activePromises = Math.max(0, self.activePromises - 1);
                self.complete = self.activePromises === 0;
            };
        }

        return {
            createTracker: function (isComplete) {
                return new WorkTracker(isComplete);
            }
        };
    }]);
