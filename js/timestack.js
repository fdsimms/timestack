var timestack = angular.module('timestack', [
  'timestack.directives.timer',
  'timestack.directives.timerButtons',
  'timestack.directives.timerForm',
  'timestack.filters.formatTimer'
]);

timestack.controller('stackCtrl', function ($interval) {
  var stack = this;

  stack.formSeconds = 0;
  stack.formMinutes = 0;
  stack.formHours = 0;
  stack.timers = JSON.parse(localStorage.getItem('timers')) || [];
  if (!window.localStorage.getItem('timers')) {
    window.localStorage.setItem('timers', JSON.stringify([]));
  }
  stack.timersRunning = false;
  stack.isPaused = false;

  stack.isEmpty = function () {
    return stack.timers.length <= 0;
  };

  stack.addTimer = function () {
    var timer = {
      timeInSeconds: stack.formSeconds +
                     stack.formMinutes * 60 +
                     stack.formHours * 3600,
      timerDesc: stack.timerDesc
    };

    stack.timers.push(timer);
    stack.addToCookieStack('timers', timer);
    stack.resetForm();
  };

  stack.addToCookieStack = function (cookieName, val) {
    var cookie = JSON.parse(localStorage.getItem(cookieName));
    cookie.push(val);
    cookie = JSON.stringify(cookie);
    localStorage.setItem(cookieName, cookie);
  };

  stack.resetForm = function () {
    stack.formSeconds = 0;
    stack.formMinutes = 0;
    stack.formHours = 0;
    stack.timerDesc = "";
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
    stack.stopInterval();
    stack.isPaused = true;
  };

  stack.tick = function () {
    stack.timers[0].timeInSeconds -= 1;
    stack.cookieTick();
  };

  stack.cookieTick = function () {
    var cookie = JSON.parse(localStorage.getItem('timers'));
    cookie[0].timeInSeconds--;
    localStorage.setItem('timers', JSON.stringify(cookie));
  };

  stack.stopInterval = function () {
    $interval.cancel(stack.timerInt);
  };

  stack.endFirstTimerAndContinue = function () {
    stack.stopInterval();
    stack.timers = stack.timers.slice(1);
    if (stack.isEmpty()) {
      stack.timersRunning = false;
    } else {
      stack.startTimer();
    }
  };

  stack.removeTimer = function (idx) {
    stack.timers.splice(idx, 1);
    if (stack.isEmpty()) {
      stack.stopInterval();
      stack.timersRunning = false;
      stack.isPaused = false;
    };
  };
})
