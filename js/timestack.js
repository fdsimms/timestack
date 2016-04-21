var timestack = angular.module('timestack', ['timestack.directives.timer']);

timestack.controller('stackCtrl', function ($interval) {
  var stack = this;

  stack.formSeconds = 0;
  stack.timers = [];
  stack.timersRunning = false;

  stack.addTimer = function () {
    stack.timers.push({ timeLeft: stack.formSeconds });
  };

  stack.removeFirstTimer = function () {
    $interval.cancel(timers);
    stack.timers = stack.timers.slice(1);
    if (stack.timers.length <= 0) {
      stack.timersRunning = false;
    } else {
      stack.startTimer();
    }
  };

  stack.startTimer = function () {
    if (stack.timers.length > 0) {
      stack.timersRunning = true;
      stack.timerInt = $interval(function () {
        if (stack.timers[0].timeLeft > 0) {
          stack.timers[0].timeLeft -= 1;
        } else {
          stack.endFirstTimer();
        }
      }, 1000);
    }
  };

  stack.endFirstTimer = function () {
    $interval.cancel(stack.timerInt);
    stack.timers = stack.timers.slice(1);
    if (stack.timers.length <= 0) {
      stack.timersRunning = false;
    } else {
      stack.startTimer();
    }
  };
})
