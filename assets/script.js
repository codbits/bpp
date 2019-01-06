$(function () {
  var masonry = $('.bpp-masonry')

  console.log(masonry )

  savvior.init('.bpp-masonry', {
    "screen and (max-width: 30em)": { columns: 1 },
    "screen and (min-width: 30em) and (max-width: 60em)": { columns: 2 },
    "screen and (min-width: 60em)": { columns: 3 }
  });

  masonry.removeClass('bpp-loading')
})
