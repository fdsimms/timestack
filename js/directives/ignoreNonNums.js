function isLetterCode (keyCode) {
  return (keyCode >= 65 && keyCode <= 90);
}

angular.module("timestack").directive("ignoreNonNums", function() {
  return function(scope, element, attrs) {

    element.bind("keydown keypress", function(event) {
      var keyCode = event.which || event.keyCode;

      if (isLetterCode(keyCode)) {
        event.preventDefault();
      }
    });
  };
});
