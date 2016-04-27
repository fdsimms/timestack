var cookie = {
  timers: [],
  timersRunning: false,
  isPaused: false
};

var timerInterval;

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
  return timers().length === 0;
};

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

function pauseTimers() {
  stopInterval();
  cookie.isPaused = true;
}

function setTimerInt () {
  timerInterval = setInterval(function () {
    if (timers()[0].timeLeft > 0) {
      tick();
    } else {
      endFirstTimerAndContinue();
    }
  }, 1000);
};

function endFirstTimerAndContinue () {
  removeTimer(0);
  alert('BEEP BEEP BEEP');
  if (stackIsEmpty()) {
    cookie.timersRunning = false;
  } else {
    setTimerInt();
  }
};

function removeTimer(idx) {
  stopTimer();
  timers().splice(idx, 1);
};

function stopInterval() {
  clearInterval(timerInterval);
};

function stopTimer() {
  if (stackIsEmpty()) {
    stopInterval();
    cookie.timersRunning = false;
    cookie.isPaused = false;
  };
};
