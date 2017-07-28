// 生成 iOS 二维码
$('.ios-qrcode').qrcode({
  width: 132,
  height: 132,
  text: $('.ios-qrcode').data('url')
});

// 生成 Android 二维码
$('.android-qrcode').qrcode({
  width: 132,
  height: 132,
  text: $('.android-qrcode').data('url')
});

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
