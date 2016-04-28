angular.module("timestack.services.bgpService", [])
  .service("bgpService", function () {
    this.getBGP = chrome.runtime.getBackgroundPage;
  });
