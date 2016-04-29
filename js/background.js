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
  var timer = background.timers[0];
  background.timers[0].timeLeft--;
  updateIcon(timer.timeInSeconds, timer.timeLeft);
}

function updateIcon(startTime, timeLeft) {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var icon = new Image();
  icon.src = "icon.png";
  var elapsedTime = startTime - timeLeft;
  var timeRatio = elapsedTime / startTime;
  var width = 19 * timeRatio;
  if (width <= 2) { width = 2; }

  ctx.drawImage(icon, 0, 0, 19, 17);
  ctx.fillStyle = "rgb(0,200,0)";
  ctx.fillRect(0, 17, width, 7);

  var imageData = ctx.getImageData(0, 0, 19, 19);
  chrome.browserAction.setIcon({ imageData: imageData });
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
