var timestack = angular.module('timestack', [
  'timestack.directives.timer',
  'timestack.directives.timerButtons',
  'timestack.directives.timerForm',
  'timestack.filters.formatTimer'
]);

timestack.controller('stackCtrl', function ($interval) {
  var stack = this;

  stack.cookie = function () {
    return JSON.parse(localStorage.getItem('timestack'));
  };

  stack.initCookie = function () {
    var cookie = stack.cookie();
    if (!cookie) {
      cookie = {
        timers: [],
        timersRunning: false,
        isPaused: false
      }
      localStorage.setItem('timestack', JSON.stringify(cookie));
    }
  };

  stack.getCookieItem = function (cookieName) {
    return(
      stack.cookie()[cookieName]
    );
  }

  stack.setCookieItem = function (cookieName, val) {
    var cookie = stack.cookie();
    cookie[cookieName] = val;
    localStorage.setItem('timestack', JSON.stringify(cookie));
  }

  stack.removeTimerFromCookie = function (idx) {
    var cookie = stack.cookie().timers;
    cookie.splice(idx, 1);
    stack.setCookieItem('timers', cookie);
  };

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
    timer.timeLeft = timer.timeInSeconds;

    stack.timers.push(timer);
    stack.addToCookieStack('timers', timer);
    stack.resetForm();
  };

  stack.addToCookieStack = function (cookieName, val) {
    var cookie = stack.getCookieItem(cookieName);
    cookie.push(val);
    stack.setCookieItem(cookieName, cookie);
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
      stack.setCookieItem('timersRunning', true);
      stack.setCookieItem('isPaused', false);
      stack.isPaused = false;
      stack.setTimerInt();
    }
  };

  stack.setTimerInt = function () {
    stack.timerInt = $interval(function () {
      if (stack.timers[0].timeLeft > 0) {
        stack.tick();
      } else {
        stack.endFirstTimerAndContinue();
      }
    }, 1000);
  };

  stack.pauseTimers = function () {
    stack.stopInterval();
    stack.isPaused = true;
    stack.setCookieItem('isPaused', true);
  };

  stack.tick = function () {
    stack.timers[0].timeLeft -= 1;
    stack.cookieTick();
  };

  stack.cookieTick = function () {
    var cookie = stack.getCookieItem('timers');
    cookie[0].timeLeft--;
    stack.setCookieItem('timers', cookie);
  };

  stack.stopInterval = function () {
    $interval.cancel(stack.timerInt);
  };

  stack.endFirstTimerAndContinue = function () {
    stack.stopInterval();
    stack.removeTimer(0);
    if (stack.isEmpty()) {
      stack.timersRunning = false;
      stack.setCookieItem('timersRunning', false);
    } else {
      stack.startTimer();
    }
  };

  stack.moveTimerUp = function (idx) {
    if (stack.timers[idx - 1]) {
      var timer = stack.timers[idx];
      stack.timers[idx] = stack.timers[idx - 1];
      stack.timers[idx - 1] = timer;
    }
  };

  stack.moveTimerDown = function (idx) {
    if (stack.timers[idx + 1]) {
      var timer = stack.timers[idx];
      stack.timers[idx] = stack.timers[idx + 1];
      stack.timers[idx + 1] = timer;
    }
  };

  stack.resetTimer = function (idx) {
    var timer = stack.timers[idx];
    timer.timeLeft = timer.timeInSeconds;
  };

  stack.removeTimer = function (idx) {
    stack.timers.splice(idx, 1);
    stack.removeTimerFromCookie(idx);
    if (stack.isEmpty()) {
      stack.stopInterval();
      stack.timersRunning = false;
      stack.isPaused = false;
      stack.setCookieItem('timersRunning', false);
      stack.setCookieItem('isPaused', false);
    };
  };

  stack.formSeconds = 0;
  stack.formMinutes = 0;
  stack.formHours = 0;
  stack.initCookie();
  stack.timersRunning = stack.getCookieItem('timersRunning');
  stack.isPaused = stack.getCookieItem('isPaused');
  stack.timers = stack.getCookieItem('timers');
  if (stack.timersRunning && !stack.isPaused) { stack.startTimer(); }
})
