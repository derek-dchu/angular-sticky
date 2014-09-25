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
              $window = angular.element(window),
              doc = document.documentElement,
              startPosition,
              currPosition,
              setSticky,
              reset;

          if (scope.animation) {
            element.css('-webkit-transition', 'height 1s ease-out, background-color 1s ease-out');
            element.css('-moz-transition', 'height 1s ease-out, background-color 1s ease-out');
            element.css('-ms-transition', 'height 1s ease-out, background-color 1s ease-out');
            element.css('-o-transition', 'height 1s ease-out, background-color 1s ease-out');
            element.css('transition', 'height 1s ease-out, background-color 1s ease-out');
          }

          // Set appropriate style based on the location
          switch (locate) {
            case 'left':
              currPosition = function() {
                return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
              };
              startPosition = scope.at * window.innerWidth || element.offset().left+1;
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
              startPosition = scope.at * window.innerHeight || 0;
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
              startPosition = scope.at * window.innerWidth || 0;
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
              startPosition = scope.at * window.innerHeight || element.offset().top+1;
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
                startPosition = scope.at * window.innerHeight || element.offset().left+1;
                break;
              case 'bottom':
                startPosition = scope.at * window.innerHeight || 0;
                break;
              case 'right':
                startPosition = scope.at * window.innerHeight || 0;
                break;
              default :
                startPosition = scope.at * window.innerHeight || element.offset().top+1;
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