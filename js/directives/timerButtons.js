angular.module("timestack.directives.timerButtons", [])
  .directive("timerButtons", function () {
    return {
      restrict: "E",
      templateUrl: "templates/timer-buttons.html"
    };
  });
