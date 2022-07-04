(function($) {
  $.fn.saf = function(options) {
    var settings = $.extend({
      speed: 2
    });

    var $this = this;
    var $safHelperImgs = $this.children('.saf-helper-imgs');
    var $safHelperPlaceholder = $this.children('.saf-helper-placeholder');
    var $safImg = $this.find('.saf-img');
    var safImgCount = 150;
    var safImgFilename = 'scroll-animate-img';
    var safImgFolderPath = $safImg.attr('src').split(safImgFilename)[0];
    var speedLimit = Math.min(3, settings.speed);
    var $window = $(window);
    var zIndex = 0;

    var safHelperPlaceholderHeightCss = (1000 / speedLimit).toString() + 'vh';

    $safHelperPlaceholder.css('height', safHelperPlaceholderHeightCss);

    var $clonedScrollAnimationImg = $safImg.clone();
    var safHelperPlaceholderHeight = $safHelperPlaceholder.height();
    var topZone = $safHelperPlaceholder.offset().top;
    var endZone = safHelperPlaceholderHeight - $window.height();

    $safImg.css('z-index', '1');

    for (i = 2; i <= safImgCount; i++) {
      $safImgActive = $clonedScrollAnimationImg.attr('src', safImgFolderPath + safImgFilename + '-' + i + '.jpg');

      $safHelperImgs.append($safImgActive.clone());
    }

    $window.scroll(function() {
      var currentScrollTop = $window.scrollTop();

      if ((currentScrollTop) >= topZone) {
        var currentScrollFraction = (currentScrollTop - topZone) / endZone;
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
