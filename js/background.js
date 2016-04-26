if (typeof cookie === "undefined") {
  var cookie = {
    timers: [],
    timersRunning: false,
    isPaused: false
  };
}

function timers() {
  return cookie.timers;
};

function pushToTimers(val) {
  cookie.timers.push(val);
};

function getCookie() {
  return cookie;
}

function startTimer() {
  setInterval(function () {
    cookie.timers[0].timeLeft--;
  }, 1000)
}
