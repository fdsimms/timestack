var timestack = angular.module('timestack', ['timestack.directives.timer']);

timestack.controller('stackCtrl', function ($interval) {
  var stack = this;

  stack.formSeconds = 0;
  stack.timers = [];
  stack.timersRunning = false;
  stack.isPaused = false;

  stack.addTimer = function () {
    stack.timers.push({ timeLeft: stack.formSeconds });
    stack.formSeconds = 0;
  };

  stack.startTimer = function () {
    if (stack.timers.length > 0) {
      stack.timersRunning = true;
      stack.isPaused = false;
      stack.timerInt = $interval(function () {
        if (stack.timers[0].timeLeft > 0) {
          stack.tick();
        } else {
          stack.endFirstTimer();
        }
      }, 1000);
    }
  };

  stack.pauseTimers = function () {
    $interval.cancel(stack.timerInt);
    stack.isPaused = true;
  };

  stack.tick = function () {
    stack.timers[0].timeLeft -= 1;
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
