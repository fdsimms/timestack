timestack.controller("stackCtrl", function ($scope, $interval, bgpService) {
  var stack = this;
  stack.show = false;

  stack.updateInfo = function () {
    bgpService.getBGP(function (bgp) {
      stack.timers = bgp.timers();
      stack.timersRunning = bgp.timersRunning();
      stack.isPaused = bgp.isPaused();
      stack.show = true;
    });
  };

  stack.seconds = function () {
    return Number(stack.formSeconds);
  };

  stack.minutes = function () {
    return Number(stack.formMinutes);
  };

  stack.hours = function () {
    return Number(stack.formHours);
  };

  stack.resetForm = function () {
    stack.formSeconds = "00";
    stack.formMinutes = "00";
    stack.formHours = "00";
    stack.timerDesc = "";
  };

  stack.addTimer = function () {
    var timer = {
      timeInSeconds: stack.seconds() +
                     stack.formMinutes * 60 +
                     stack.formHours * 3600,
      timerDesc: stack.timerDesc
    };
    timer.timeLeft = timer.timeInSeconds;

    stack.timers.push(timer);
    stack.resetForm();
  };

  stack.isEmpty = function () {
    if (stack.show) {
      return stack.timers.length === 0;
    } else {
      return true;
    }
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

    bgpService.removeTimer(idx);
  };

  stack.padNum = function (num) {
    var pad = num < 10 ? "0" : "";
    return pad + num;
  };

  stack.addSecond = function () {
    if (stack.seconds() < 59) {
      stack.formSeconds = stack.padNum(Number(stack.formSeconds) + 1);
    }
  };

  stack.subSecond = function () {
    if (stack.seconds() > 0) {
      stack.formSeconds = stack.padNum(Number(stack.formSeconds) - 1);
    }
  };

  stack.addMinutes = function () {
    if (stack.minutes() < 59) {
      stack.formMinutes = stack.padNum(Number(stack.formMinutes) + 1);
    }
  };

  stack.subMinutes = function () {
    if (stack.minutes() > 0) {
      stack.formMinutes = stack.padNum(Number(stack.formMinutes) - 1);
    }
  };

  stack.addHour = function () {
    stack.formHours = stack.padNum(Number(stack.formHours) + 1);
  };

  stack.subHour = function () {
    if (stack.hours() > 0) {
      stack.formHours = stack.padNum(Number(stack.formHours) - 1);
    }
  };

  stack.formSeconds = "00";
  stack.formMinutes = "00";
  stack.formHours = "00";
  stack.timerDesc = "";
  stack.updateInt = $interval(function () {
    stack.updateInfo();
  }, 1000);
});
