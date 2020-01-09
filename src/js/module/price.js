$(document).ready(function () {
  $('.spoiler__btn').on('click', f_acc);
  $('.spoiler').click(function() {
    $(this).toggleClass('opened');
    $('.spoiler').not($(this)).removeClass('opened');
  })
});

function f_acc() {
  $('.spoiler__inner').not($(this).next()).slideUp(500);
  $(this).next().slideToggle(500);
}