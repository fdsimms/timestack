angular.module("timestack.directives.timerStack", [])
  .directive("timerStack", function () {
    return {
      restrict: "E",
      templateUrl: "templates/timer-stack.html"
    };
  });
