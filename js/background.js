var background = {
  timers: [],
  timersRunning: false,
  isPaused: false
};

var timerInterval;

function timers() {
  return background.timers;
}

function timersRunning() {
  return background.timersRunning;
}

function isPaused() {
  return background.isPaused;
}

function stackIsEmpty() {
  return timers().length === 0;
}

function tick() {
  background.timers[0].timeLeft--;
}

function startTimer() {
  if (!stackIsEmpty()) {
    background.timersRunning = true;
    background.isPaused = false;
    setTimerInt();
  }
}

function pauseTimers() {
  stopInterval();
  background.isPaused = true;
}

function setTimerInt () {
  timerInterval = setInterval(function () {
    if (timers()[0].timeLeft > 0) {
      tick();
    } else {
      endFirstTimerAndContinue();
    }
  }, 1000);
}

function endFirstTimerAndContinue () {
  removeTimer(0);
  alert("BEEP BEEP BEEP");
  if (stackIsEmpty()) {
    background.timersRunning = false;
  } else {
    setTimerInt();
  }
}

function removeTimer(idx) {
  stopInterval();
  background.timersRunning = false;
  background.isPaused = false;
  timers().splice(idx, 1);
}

function stopInterval() {
  clearInterval(timerInterval);
}

function clearTimers() {
  stopInterval();
  background.timers.length = 0;
  background.timersRunning = false;
  background.isPaused = false;
}

function stopTimer() {
  if (stackIsEmpty()) {
    stopInterval();
  }
}
