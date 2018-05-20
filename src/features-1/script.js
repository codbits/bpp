$(function () {
  $('.obs-icon svg').each(function () {
    var $this = $(this)
    var type = $this.data('type') || ''
    var start = $this.data('start') || ''
    var duration = $this.data('duration') || ''
    var delay = $this.data('delay') || ''

    new Vivus(this, { // eslint-disable-line
      type: type,
      start: start,
      duration: duration,
      delay: delay
    })
  })
})
