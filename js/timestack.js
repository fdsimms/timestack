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

  stack.updateInfo = function () {
    getBGP(function (bgp) {
      $scope.$apply(function () {
        stack.timers = bgp.timers();
        stack.timersRunning = bgp.timersRunning();
        stack.isPaused = bgp.isPaused();
      });
    });
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
    getBGP(function (bgp) {
      bgp.startTimer();
    });
  };

  stack.pauseTimers = function () {
    getBGP(function (bgp) {
      bgp.pauseTimers();
    });
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
    getBGP(function (bgp) {
      bgp.resetTimer(idx);
    });
  };

  stack.formSeconds = 0;
  stack.formMinutes = 0;
  stack.formHours = 0;
  stack.timerDesc = "";
  stack.updateInt = $interval(function () {
    stack.updateInfo();
  }, 1000);
})
