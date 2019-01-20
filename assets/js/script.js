$(function() {
  var masonry = $('.bpp-masonry');

  savvior.init('.bpp-masonry', {
    'screen and (max-width: 30em)': { columns: 1 },
    'screen and (min-width: 30em) and (max-width: 60em)': { columns: 2 },
    'screen and (min-width: 60em)': { columns: 3 }
  });

  masonry.removeClass('bpp-loading');

  // Thanks to https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
  function waitForElementToDisplay(selector, time) {
    if (document.querySelector(selector) != null) {
      $(selector).popover({
        placement: 'bottom',
        html: true,
        trigger: 'focus'
      })
      return
    } else {
      setTimeout(function() {
        waitForElementToDisplay(selector, time)
      }, time)
    }
  }

	waitForElementToDisplay('[data-toggle="popover"]')
});
