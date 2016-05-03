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

var icon = new Image();
icon.src = "assets/icon.png";

function updateIcon(startTime, timeLeft) {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var elapsedTime = startTime - timeLeft;
  var timeRatio = elapsedTime / startTime;
  var width = 19 * timeRatio;
  if (width <= 1) { width = 1; }
  ctx.drawImage(icon, 0, 0, 19, 19);
  ctx.fillStyle = "rgba(121,100,237, 0.5)";
  ctx.fillRect(0, 0, width, 19);

  var imageData = ctx.getImageData(0, 0, 19, 19);
  chrome.browserAction.setIcon({ imageData: imageData });
}

function resetIcon() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(icon, 0, 0, 19, 19);
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

function setTimerInt() {
  if (!timerInterval) {
    timerInterval = setInterval(function () {
      if (timers()[0].timeLeft > 0) {
        tick();
      } else {
        endFirstTimerAndContinue();
      }
    }, 1000);
  }
}

function playBellSound() {
  var bell = document.getElementsByClassName("bell-sound")[0];
  bell.play();
}

function getAlertText() {
  var result;

  if (timers().length === 1) {
    result = "Time to stop!";
  } else if (timers().length > 1) {
    var secondTimerDesc = timers()[1].timerDesc;
    if (secondTimerDesc) {
      result = "Time to move on! Next up: " + secondTimerDesc + ".";
    } else {
      result = "Time to move on!";
    }
  }

  return result;
}

function alertAndSound() {
  playBellSound();
  alert(getAlertText());
}

function endFirstTimerAndContinue() {
  alertAndSound();
  timers().splice(0, 1);
  if (stackIsEmpty()) {
    background.timersRunning = false;
    stopInterval();
  } else {
    setTimerInt();
  }
  resetIcon();
}

function removeTimer(idx) {
  if (idx === 0) {
    resetIcon();
    stopInterval();
    background.timersRunning = false;
    background.isPaused = false;
  }
}

function stopInterval() {
  timerInterval = clearInterval(timerInterval);
}

function clearTimers() {
  resetIcon();
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
