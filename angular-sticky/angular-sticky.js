/**
 * Created by DerekHu on 9/18/14.
 */

angular.module('dhu.sticky', [])

.directive('dhu.sticky', [function() {
      return {
        restrict: 'A',
        scope: {
          locate: '@stickyLocate',
          at: '@stickyAt',
          animation: '@stickyAnimation'
        },
        link: function(scope, element, attrs) {
          var locate = scope.locate || 'top',
              at = scope.at || 0,
              $window = angular.element(window),
              doc = document.documentElement,
              startPosition,
              currPosition,
              setSticky,
              reset;

          if (scope.animation) {
            element.css('-webkit-transition', '1s ease-out all');
            element.css('-moz-transition', '1s ease-out all');
            element.css('-ms-transition', '1s ease-out all');
            element.css('-o-transition', '1s ease-out all');
            element.css('transition', '1s ease-out all');
          }

          // Set appropriate style based on the location
          switch (locate) {
            case 'left':
              currPosition = function() {
                return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
              };
              startPosition = at * window.innerWidth;
              setSticky = function() {
                element.addClass('sticky-left');
              };
              reset = function () {
                element.removeClass('sticky-left');
              };
              break;
            case 'bottom':
              currPosition = function() {
                return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
              };
              startPosition = at * window.innerHeight;
              setSticky = function() {
                element.addClass('sticky-bottom');
              };
              reset = function () {
                element.removeClass('sticky-bottom');
              };
              break;
            case 'right':
              currPosition = function() {
                return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
              };
              startPosition = at * window.innerWidth;
              setSticky = function() {
                element.addClass('sticky-right');
              };
              reset = function () {
                element.removeClass('sticky-right');
              };
              break;
            default :
              currPosition = function() {
                return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
              };
              startPosition = at * window.innerHeight;
              setSticky = function() {
                element.addClass('sticky-top');
              };
              reset = function () {
                element.removeClass('sticky-top');
              };
              break;
          }


          // Check if the $window has passed the start line, if it has passed, set element to sticky style
          function check() {
            if (currPosition() >= startPosition) {
              setSticky();
            }

            else
            {
              reset();
            }

          }

          // Handle the resize event
          function resize() {
            switch (locate) {
              case 'left':
                startPosition = at * window.innerWidth;
                break;
              case 'bottom':
                startPosition = at * window.innerHeight;
                break;
              case 'right':
                startPosition = at * window.innerWidth;
                break;
              default :
                startPosition = at * window.innerHeight;
                break;
            }
          }

          // Attach our listeners
          $window.on('scroll', check);
          $window.on('resize', resize);

          check();
        }
      };

    }]);