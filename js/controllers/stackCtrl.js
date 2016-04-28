timestack.controller("stackCtrl", function ($scope, $interval, bgpService) {
  var stack = this;

  stack.updateInfo = function () {
    bgpService.getBGP(function (bgp) {
      stack.timers = bgp.timers();
      stack.timersRunning = bgp.timersRunning();
      stack.isPaused = bgp.isPaused();
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

    stack.timers.push(timer);
    stack.resetForm();
  };

  stack.isEmpty = function () {
    if (stack.show) { return stack.timers.length === 0; }
  };

  stack.startTimer = function () {
    bgpService.startTimer();

    if (!stack.isEmpty()) {
      stack.timersRunning = true;
      stack.isPaused = false;
    }
  };

  stack.pauseTimers = function () {
    bgpService.pauseTimers();
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
    if (idx === 0) { stack.pauseTimers(); }

    var timer = stack.timers[idx];
    timer.timeLeft = timer.timeInSeconds;
  };

  stack.clearTimers = function () {
    if (stack.timersRunning) { bgpService.clearTimers(); }
    stack.timers.length = 0;
    stack.timersRunning = false;
    stack.isPaused = false;
  };

  stack.removeTimer = function (idx) {
    stack.timers.splice(idx, 1);
    if (stack.isEmpty()) {
      stack.timersRunning = false;
      stack.isPaused = false;
    }

    bgpService.stopTimer(idx);
  };

  stack.formSeconds = 0;
  stack.formMinutes = 0;
  stack.formHours = 0;
  stack.timerDesc = "";
  stack.updateInt = $interval(function () {
    stack.updateInfo();
  }, 1000);
});
