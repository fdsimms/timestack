angular.module("timestack.directives.header", [])
  .directive("header", function () {
    return {
      restrict: "E",
      scope: {
        data: "="
      },
      templateUrl: "templates/header.html"
    };
  });
