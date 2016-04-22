var timestack = angular.module('timestack', [
  'timestack.directives.timer',
  'timestack.directives.timerButtons',
  'timestack.filters.formatTimer'
]);

timestack.controller('stackCtrl', function ($interval) {
  var stack = this;

  stack.formSeconds = 0;
  stack.formMinutes = 0;
  stack.timers = [];
  stack.timersRunning = false;
  stack.isPaused = false;

  stack.isEmpty = function () {
    return stack.timers.length <= 0;
  };

  stack.addTimer = function () {
    stack.timers.push({
      timeInSeconds: stack.formSeconds + stack.formMinutes * 60
    });
    stack.resetForm();
  };

  stack.resetForm = function () {
    stack.formSeconds = 0;
    stack.formMinutes = 0;
  };

  stack.startTimer = function () {
    if (!stack.isEmpty()) {
      stack.timersRunning = true;
      stack.isPaused = false;
      stack.setTimerInt();
    }
  };

  stack.setTimerInt = function () {
    stack.timerInt = $interval(function () {
      if (stack.timers[0].timeInSeconds > 0) {
        stack.tick();
      } else {
        stack.endFirstTimerAndContinue();
      }
    }, 1000);
  };

  stack.pauseTimers = function () {
    $interval.cancel(stack.timerInt);
    stack.isPaused = true;
  };

  stack.tick = function () {
    stack.timers[0].timeInSeconds -= 1;
  };

  stack.endFirstTimerAndContinue = function () {
    $interval.cancel(stack.timerInt);
    stack.timers = stack.timers.slice(1);
    if (stack.isEmpty()) {
      stack.timersRunning = false;
    } else {
      stack.startTimer();
    }
  };

  stack.removeTimer = function (idx) {
    if (idx === 0) {
      $interval.cancel(stack.timerInt);
    };

    stack.timers.splice(idx, 1);
  };
})
