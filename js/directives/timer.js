angular.module('timestack.directives.timer', [])
  .directive('timer', function ($interval) {
    return {
      restrict: 'EA',
      scope: {
        data: "="
      },
      template: "<h1>{{ data.timeInSeconds }}</h1>"
    };
  });
