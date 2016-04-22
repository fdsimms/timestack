angular.module('timestack.directives.timer', [])
  .directive('timer', function ($interval) {
    return {
      restrict: 'EA',
      scope: {
        data: "="
      },
      templateUrl: "templates/timer.html"
    };
  });
