function isCharCode (keyCode) {
  return (keyCode >= 40 && keyCode <= 90);
}

angular.module("timestack").directive("enforceLengthOfTwo", function() {
  return function(scope, element, attrs) {

    element.bind("keydown keypress", function(event) {
      var keyCode = event.which || event.keyCode;

      if (element[0].value.length >= 2 && isCharCode(keyCode)) {
        event.preventDefault();
      }
    });
  };
});
