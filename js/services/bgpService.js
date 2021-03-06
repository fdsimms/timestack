angular.module("timestack.services.bgpService", [])
  .service("bgpService", function () {
    var bgpService = this;
    bgpService.getBGP = chrome.runtime.getBackgroundPage;

    bgpService.stopInterval = function () {
      bgpService.getBGP(function (bgp) {
        bgp.stopInterval();
      });
    };

    bgpService.pauseTimers = function () {
      bgpService.getBGP(function (bgp) {
        bgp.pauseTimers();
      });
    };

    bgpService.clearTimers = function () {
      bgpService.getBGP(function (bgp) {
        bgp.clearTimers();
      });
    };

    bgpService.stopTimer = function (idx) {
      bgpService.getBGP(function (bgp) {
        bgp.stopTimer(idx);
      });
    };

    bgpService.removeTimer = function (idx) {
      bgpService.getBGP(function (bgp) {
        bgp.removeTimer(idx);
      });
    };

    bgpService.startTimer = function () {
      bgpService.getBGP(function (bgp) {
        bgp.startTimer();
      });
    };

    bgpService.resetIcon = function () {
      bgpService.getBGP(function (bgp) {
        bgp.resetIcon();
      });
    };
  });
