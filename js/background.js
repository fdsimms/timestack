var cookie = {
  timers: [],
  timersRunning: false,
  isPaused: false
};

var timerInt;

function timers() {
  return cookie.timers;
};

function timersRunning() {
  return cookie.timersRunning;
};

function isPaused() {
  return cookie.isPaused;
};

function stackIsEmpty() {
  return timers().length <= 0;
};

function pushToTimers(val) {
  cookie.timers.push(val);
};

function getCookie() {
  return cookie;
}

function tick() {
  cookie.timers[0].timeLeft--;
}

function startTimer() {
  if (!stackIsEmpty()) {
    cookie.timersRunning = true;
    cookie.isPaused = false;
    setTimerInt();
  }
}

function resetTimer(idx) {
  var timer = timers()[idx];
  timer.timeLeft = timer.timeInSeconds;
};

function pauseTimers() {
  stopInterval();
  cookie.isPaused = true;
}

function setTimerInt () {
  timerInt = setInterval(function () {
    if (timers()[0].timeLeft > 0) {
      tick();
    } else {
      endFirstTimerAndContinue();
    }
  }, 1000);
};

function endFirstTimerAndContinue () {
  stopInterval();
  removeTimer(0);
  if (stackIsEmpty()) {
    cookie.timersRunning = false;
  } else {
    startTimerInt();
  }
};

function stopInterval() {
  clearInterval(timerInt);
};

function removeTimer(idx) {
  cookie.timers.splice(idx, 1);
  if (stackIsEmpty()) {
    stopInterval();
    cookie.timersRunning = false;
    cookie.isPaused = false;
  };
};
