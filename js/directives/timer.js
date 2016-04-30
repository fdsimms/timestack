angular.module("timestack.directives.timer", [])
  .directive("timer", function () {
    return {
      restrict: "E",
      scope: {
        data: "="
      },
      templateUrl: "templates/timer.html"
    };
  });
