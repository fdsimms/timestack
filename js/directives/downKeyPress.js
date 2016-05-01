angular.module("timestack").directive('dlDownKey', function() {
  return function(scope, element, attrs) {

    element.bind("keydown keypress", function(event) {
      var keyCode = event.which || event.keyCode;

      if (keyCode === 40) {
        scope.$apply(function() {
          scope.$eval(attrs.dlDownKey);
        });

        event.preventDefault();
      }
    });
  };
});
