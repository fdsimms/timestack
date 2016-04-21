var timestack = angular.module('timestack', []);

timestack.controller('stackCtrl', function ($scope) {
  $scope.timers = [{timeLeft: 100 }];

  $scope.addTimer = function (timeLeft) {
    $scope.timers.push({ timeLeft: timeLeft });
  }
})
