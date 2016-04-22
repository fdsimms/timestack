angular.module('timestack.directives.timerForm', [])
  .directive('timerForm', function () {
    return {
      restrict: 'E',
      templateUrl: "templates/timer-form.html"
    };
  });
