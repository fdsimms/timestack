var timestack = angular.module('timestack', [
  'timestack.directives.timer',
  'timestack.directives.timerButtons',
  'timestack.directives.timerForm',
  'timestack.filters.formatTimer'
]);

timestack.controller('stackCtrl', function ($scope, $interval) {
  var stack = this;
  var getBGP = chrome.runtime.getBackgroundPage;

  stack.cookie = function () {
    return getBGP(function (bgp) {
      return bgp.getCookie();
    })
  };

  stack.updateCookie = function () {
    getBGP(function (bgp) {
      $scope.$apply(function () {
        stack.timers = bgp.timers();
      });
    });
  };

  stack.getCookieItem = function (cookieName) {
    var cookie = stack.cookie();
    return !!cookie ? cookie[cookieName] : null;
  }

  stack.setCookieItem = function (cookieName, val) {
    var cookie = stack.cookie();
    cookie[cookieName] = val;
  }

  stack.removeTimerFromCookie = function (idx) {

  };

  stack.isEmpty = function () {
    return stack.timers.length <= 0;
  };

  stack.pushTimerToStack = function (timer) {
    getBGP(function (bgp) {
      bgp.pushToTimers(timer);
      $scope.$apply(function () {
        stack.timers = bgp.timers();
      });
    });
  };

  stack.resetForm = function () {
    stack.formSeconds = 0;
    stack.formMinutes = 0;
    stack.formHours = 0;
    stack.timerDesc = "";
  };

  stack.addTimer = function () {
    var timer = {
      timeInSeconds: stack.formSeconds +
                     stack.formMinutes * 60 +
                     stack.formHours * 3600,
      timerDesc: stack.timerDesc
    };
    timer.timeLeft = timer.timeInSeconds;

    stack.pushTimerToStack(timer);
    stack.resetForm();
  };


  stack.startTimer = function () {
    if (!stack.isEmpty()) {
      var storage = window.localStorage;
      chrome.runtime.getBackgroundPage(function (bgp) {
        bgp.startTimer(stack.cookie(), storage)
      });
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
    $interval(function () {
      chrome.runtime.getBackgroundPage(function (bgp) {
        stack.cookies = bgp.cookie();
      });
    }, 1000)
  };

  stack.bgpTick = function () {

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
      stack.setCookieItem('timers', stack.timers)
    }

    if (idx === 1 && stack.timersRunning) { stack.pauseTimers(); }
  };

  stack.moveTimerDown = function (idx) {
    if (stack.timers[idx + 1]) {
      var timer = stack.timers[idx];
      stack.timers[idx] = stack.timers[idx + 1];
      stack.timers[idx + 1] = timer;
      stack.setCookieItem('timers', stack.timers)
    }
  };

  stack.resetTimer = function (idx) {
    var timer = stack.timers[idx];
    timer.timeLeft = timer.timeInSeconds;
    stack.setCookieItem('timers', stack.timers);
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
  stack.timerDesc = "";
  stack.updateCookie();
})
