angular.module("timestack.directives.header", [])
  .directive("header", function () {
    return {
      restrict: "E",
      templateUrl: "templates/header.html"
    };
  });
