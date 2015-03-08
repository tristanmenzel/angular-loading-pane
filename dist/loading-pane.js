angular.module('loadingPane',[])
    .directive('loadingPane', [function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: { tracker: '=' },
            templateUrl: 'loading-pane.tpl.html'
        };
    }])
    .factory('loading', [function() {
        function WorkTracker(isComplete) {
            var self = this;
            self.complete = isComplete !== false;
            self.track = function(promise) {
                self.complete = false;
                return promise.then(function() {
                    self.complete = true;
                }, function() {
                    self.complete = true;
                });
            };
        }

        return {
            createTracker: function(isComplete) {
                return new WorkTracker(isComplete);
            }
        };
    }]);
