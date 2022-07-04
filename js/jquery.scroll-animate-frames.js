(function($) {
  $.fn.saf = function(options) {
    var settings = $.extend({
      imgCount: 25,
      imgFilename: 'saf-img',
      speed: 2
    }, options);

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

    var safHelperPlaceholderHeightCss = (1000 / speedLimit).toString() + 'vh';

    $safHelperPlaceholder.css('height', safHelperPlaceholderHeightCss);

    var $clonedSafImg = $safImg.clone();
    var safHelperPlaceholderHeightJs = $safHelperPlaceholder.height();
    var startZone = $safHelperPlaceholder.offset().top;
    var endZone = safHelperPlaceholderHeightJs - $window.height();

    $safImg.css('z-index', '1');

    for (i = 2; i <= safImgCount; i++) {
      $safImgActive = $clonedSafImg.attr('src', safImgFolderPath + safImgFilename + '-' + i + '.jpg');

      $safHelperImgs.append($safImgActive.clone());
    }

    $window.scroll(function() {
      var currentScrollTop = $window.scrollTop();

      if ((currentScrollTop) >= startZone) {
        var currentScrollFraction = (currentScrollTop - startZone) / endZone;
        var $safImgs = $('.saf-img');
        var safImgIndex = Math.min(
          safImgCount,
          Math.round(currentScrollFraction * safImgCount)
        );

        zIndex++;

        $safImgs.eq(safImgIndex).css('z-index', zIndex);

        $safHelperImgs.addClass('start-0');

        if (safImgIndex >= safImgCount) {
          $safHelperImgs.addClass('bottom-0 position-absolute top-auto').removeClass('position-fixed top-0');
        } else {
          $safHelperImgs.addClass('position-fixed top-0').removeClass('bottom-0 position-absolute top-auto');
        }
      } else {
        $safHelperImgs.removeClass('bottom-0 position-fixed top-auto');
        $safImg.css('z-index', zIndex + 1);
      }
    });
  };
  return this;
})(jQuery);
