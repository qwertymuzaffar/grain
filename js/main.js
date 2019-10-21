$('.why__slide').on('click', function () {
  var attr = $(this).attr('data-slide');
  $('.why__slide[data-slide="1"]').attr('data-slide', attr);
  $(this).attr('data-slide', "1");
});