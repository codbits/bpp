/* eslint-disable */
$(function () {
  var navbar = $('.obs-header-1 .navbar')

  function switchClass() {
    var offset = $(window).scrollTop()

    if (offset > 340) {
      if (navbar.hasClass('obs-navbar-light')) {
        return
      }
      navbar.toggleClass('obs-navbar-light obs-navbar-dark')
    } else {
      if (navbar.hasClass('obs-navbar-dark')) {
        return
      }
      navbar.toggleClass('obs-navbar-dark obs-navbar-light')
    }
  }

  switchClass()
  $(window).on('scroll', window.tinyThrottle.throttle(switchClass, 50, true) )
})
