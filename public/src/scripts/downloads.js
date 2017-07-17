// 打开微信二维码
$('#wechat').on('click', function() {
  $('.wechat-qrcode').removeClass('hide');
});

// 关闭微信二维码
$('.wechat-close').on('click', function() {
  $('.wechat-qrcode').addClass('hide');
});

$(document).ready(function() {
  $('.header-logo').addClass('header-logo-ready');
});
