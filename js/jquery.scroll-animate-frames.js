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

    setSafHelperPlaceholder();

    // Reset helper placeholder height on window resize
    $window.resize(function() {
      setSafHelperPlaceholder();
      zones = setSafHelperPlaceholder();
      return zones;
    });

    // Clone imgs
    var $clonedSafImg = $safImg.clone();

    // Set img z-index base
    $safImg.css('z-index', '1');

    for (i = 2; i <= safImgCount; i++) {
      $safImgActive = $clonedSafImg.attr('src', safImgFolderPath + safImgFilename + '-' + i + '.jpg');

      $safHelperImgs.append($safImgActive.clone());
    }

    // Check imgs loaded
    var $safImgs = $('.saf-img');

    $safImgs.each(function() {
      var $this = $(this);

      $this.on('load', function() {
        $this.addClass('js-loaded');

        var safImgCountLoaded = $('.js-loaded').length + 1;

        // Set imgs loaded
        if (safImgCountLoaded == safImgCount) {
          $safHelperImgs.addClass('js-loaded');
        } else {

        }
      });
    });

    // Create scroll event and function
    $window.scroll(function() {
      var currentScrollTop = $window.scrollTop();

      // Start conditional scroll animate
      if ((currentScrollTop) >= zones.startZone) {
        // Set img index
        var currentScrollFraction = (currentScrollTop - zones.startZone) / zones.endZone;
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
    });
  };
  return this;
})(jQuery);
