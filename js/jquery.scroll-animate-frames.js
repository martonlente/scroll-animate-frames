$(function() {
  var $safHelper = $('.saf-helper');
  var $safHelperPlaceholder = $('.saf-helper-placeholder');
  var $safImg = $('.saf-img');
  var safImgCount = 150;
  var safImgFilename = 'scroll-animate-img';
  var safImgFolderPath = $safImg.attr('src').split(safImgFilename)[0];
  var $window = $(window);
  var zIndex = 0;

  $safHelperPlaceholder.css('height', '500vh');

  var $clonedScrollAnimationImg = $safImg.clone();
  var safHelperPlaceholderHeight = $safHelperPlaceholder.height();
  var topZone = $safHelperPlaceholder.offset().top;
  var endZone = safHelperPlaceholderHeight - $window.height();

  for (i = 2; i <= safImgCount; i++) {
    $safImgActive = $clonedScrollAnimationImg.attr('src', safImgFolderPath + safImgFilename + '-' + i + '.jpg');

    $safHelper.append($safImgActive.clone());
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

      $safHelper.addClass('start-0');

      if (safImgIndex >= safImgCount) {
        $safHelper.addClass('bottom-0 position-absolute top-auto').removeClass('position-fixed top-0');
      } else {
        $safHelper.addClass('position-fixed top-0').removeClass('bottom-0 position-absolute top-auto');
      }
    } else {
      $safHelper.removeClass('bottom-0 position-fixed top-auto');
    }
  });
});
