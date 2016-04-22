angular.module('timestack.filters.formatTimer', [])
  .filter('formatTimer', function () {
    return function (input) {
      var padNum = function (num) {
        var pad = num < 10 ? "0" : "";
        return pad + num;
      };

      var seconds = padNum(input % 60);
      var minutes = padNum(Math.floor(input % 3600 / 60));
      var hours = padNum(Math.floor(input / 3600));
      var time = []

      if (hours > 0) {
        time = time.concat([hours, minutes, seconds]);
      } else if (minutes > 0) {
        time = time.concat([minutes, seconds]);
      } else if (seconds >= 0) {
        // empty string allows colon to be prepended to the seconds value
        time = time.concat(["", seconds]);
      }

      return time.join(":");
    };
  });
