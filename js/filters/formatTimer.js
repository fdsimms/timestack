angular.module('timestack.filters.formatTimer', [])
  .filter('formatTimer', function () {
    return function (input) {
      var padNum = function (num) {
        var pad = num < 10 ? "0" : "";
        return pad + num;
      };

      var seconds = input % 60;
      var minutes = Math.floor(input % 3600 / 60);
      return (padNum(minutes) + ':' + padNum(seconds));
    };
  });
