/* eslint-disable */
$(function () {
  var navbar = $('.bpp-header-1 .navbar')

  function switchClass() {
    var offset = $(window).scrollTop()

    if (offset > 340) {
      if (navbar.hasClass('bpp-navbar-light')) {
        return
      }
      navbar.toggleClass('bpp-navbar-light bpp-navbar-dark')
    } else {
      if (navbar.hasClass('bpp-navbar-dark')) {
        return
      }
      navbar.toggleClass('bpp-navbar-dark bpp-navbar-light')
    }
  }

  switchClass()
  $(window).on('scroll', window.tinyThrottle.throttle(switchClass, 50, true) )
})
