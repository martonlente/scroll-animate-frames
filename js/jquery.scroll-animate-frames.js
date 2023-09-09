/*!
 * Scroll animate frames v0.1.0 (https://martonlente.com/)
 * Copyright 2022 Márton Lente
 * Licensed under Apache 2.0 (https://github.com/martonlente/scroll-animate-frames/blob/main/LICENSE)
 */

// TODO: refactor js with functions named
(function($) {
  $.fn.saf = function(options) {
    // Set options defaults
    var settings = $.extend({
      imgCount: 25,
      imgFilename: 'saf-img',
      speed: 2
    }, options);

    // Set variables base
    var $this = this;
    var $safHelperImgs = $this.children('.saf-helper-imgs');
    var $safHelperPlaceholder = $this.children('.saf-helper-placeholder');
    var $safImg = $this.find('.saf-img');
    var safImgCount = settings.imgCount;
    var safImgFilename = settings.imgFilename;
    var safImgFolderPath = $safImg.attr('src').split(safImgFilename)[0];
    var speedLimit = Math.min(3, settings.speed);
    var $window = $(window);
    var zIndex = 0;

    // Set helper placeholder height
    function setSafHelperPlaceholder() {
      var safHelperPlaceholderHeightCss = (1000 / speedLimit).toString() + 'vh';

      $safHelperPlaceholder.css('height', safHelperPlaceholderHeightCss);

      var safHelperPlaceholderHeightJs = $safHelperPlaceholder.height();
      var startZone = $safHelperPlaceholder.offset().top;
      var endZone = safHelperPlaceholderHeightJs - $window.height();

      return {
        'startZone': startZone,
        'endZone': endZone
      }
    };

    // Create object zones
    var zones = setSafHelperPlaceholder();

    // Reset helper placeholder height on window resize
    $window.resize(function() {
      zones = setSafHelperPlaceholder();
      return zones;
    });

    // Create variable $clonedSafImg
    var $clonedSafImg = $safImg.clone();

    // Init img z-index
    $safImg.css('z-index', '1');

    // Clone imgs
    for (i = 2; i <= safImgCount; i++) {
      $safImgActive = $clonedSafImg.attr('src', safImgFolderPath + safImgFilename + '-' + i + '.jpg');

      $safHelperImgs.append($safImgActive.clone());
    }

    // Create variable $safImgs after imgs have been cloned
    var $safImgs = $('.saf-img');

    $safImgs.each(function() {
      var $this = $(this);

      $this.on('load', function() {
        $this.addClass('js-is-loaded');

        var safImgCountLoaded = $('.js-is-loaded').length + 1;

        // Check if imgs are loaded
        if (safImgCountLoaded == safImgCount) {
          // Set imgs loaded
          $safHelperImgs.addClass('js-is-loaded');
        }
      });
    });

    // Create scroll event and function
    $window.scroll(function() {
      // Start conditional imgs loaded
      if ($safHelperImgs.hasClass('js-is-loaded')) {
        // Create variable currentScrollTop
        var currentScrollTop = $window.scrollTop();

        // Check if current scroll top is equal or larger than start zone
        if ((currentScrollTop) >= zones.startZone) {
          // If currrent scroll top is larger than start zone, set img index
          var currentScrollFraction = (currentScrollTop - zones.startZone) / zones.endZone;
          // Create variable safImgIndex as full number
          var safImgIndex = Math.min(
            safImgCount,
            Math.round(currentScrollFraction * safImgCount)
          );

          // Increment z-index
          zIndex++;

          // Select img by img index and set z-index
          $safImgs.eq(safImgIndex).css('z-index', zIndex);

          // Set helper imgs position
          $safHelperImgs.addClass('start-0');

          // Check if saf img index is equal or larger than saf img count
          if (safImgIndex >= safImgCount) {
            $safHelperImgs.addClass('bottom-0 position-absolute top-auto').removeClass('position-fixed top-0');

            // Reset scroll animate end
            $safImgs.last().css('z-index', zIndex + 1);
          } else {
            $safHelperImgs.addClass('position-fixed top-0').removeClass('bottom-0 position-absolute top-auto');
          }
        // End conditional scroll animate start zone
        } else {
          $safHelperImgs.removeClass('bottom-0 position-fixed top-auto');

          // Reset scroll animate start
          $safImg.css('z-index', zIndex + 1);
        }
      }
    });
  };
  return this;
})(jQuery);
