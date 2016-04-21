var timestack = angular.module('timestack', ['timestack.directives.timer']);

timestack.controller('stackCtrl', function ($interval) {
  var stack = this;

  stack.formSeconds = 0;
  stack.timers = [];

  stack.addTimer = function () {
    stack.timers.push({ timeLeft: stack.formSeconds });
  };

  stack.startTimer = function () {
    var timers = $interval(function () {
      if (stack.timers[0].timeLeft > 0) {
        stack.timers[0].timeLeft -= 1;
      } else {
        $interval.cancel(timers);
      }
    }, 1000);
  };
})
