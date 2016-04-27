timestack.controller('stackCtrl', function ($scope, $interval) {
  var stack = this;
  stack.show = false;
  var getBGP = chrome.runtime.getBackgroundPage;

  stack.cookie = function () {
    return getBGP(function (bgp) {
      return bgp.getCookie();
    })
  };

  stack.updateInfo = function () {
    getBGP(function (bgp) {
      stack.timers = bgp.timers();
      stack.timersRunning = bgp.timersRunning();
      stack.isPaused = bgp.isPaused();
      stack.show = true;
    });
  };

  stack.pushTimerToStack = function (timer) {
    getBGP(function (bgp) {
      bgp.pushToTimers(timer);
      stack.timers = bgp.timers();
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

  stack.isEmpty = function () {
    return stack.timers.length === 0;
  };

  stack.startTimer = function () {
    getBGP(function (bgp) {
      bgp.startTimer();
    });

    stack.timersRunning = true;
    stack.isPaused = false;
  };

  stack.pauseTimers = function () {
    getBGP(function (bgp) {
      bgp.pauseTimers();
    });
    stack.isPaused = true;
  };

  stack.moveTimerUp = function (idx) {
    if (stack.timers[idx - 1]) {
      var timer = stack.timers[idx];
      stack.timers[idx] = stack.timers[idx - 1];
      stack.timers[idx - 1] = timer;
    }

    if (idx === 1 && stack.timersRunning) { stack.pauseTimers(); }
  };

  stack.moveTimerDown = function (idx) {
    if (stack.timers[idx + 1]) {
      var timer = stack.timers[idx];
      stack.timers[idx] = stack.timers[idx + 1];
      stack.timers[idx + 1] = timer;
    }

    if (idx === 0 && stack.timersRunning) { stack.pauseTimers(); }
  };

  stack.resetTimer = function (idx) {
    var timer = stack.timers[idx];
    timer.timeLeft = timer.timeInSeconds;
  };

  stack.removeTimer = function (idx) {
    stack.timers.splice(idx, 1);
    getBGP(function (bgp) {
      bgp.removeTimer(idx);
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
