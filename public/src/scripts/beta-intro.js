$('.android-qrcode').qrcode({
  width: 75,
  height: 75,
  foreground: '#e40321',
  text: $('.android-qrcode').data('url')
});

$(document).ready(function() {
  $('.box[title], .box-qrcode[title]').tooltip({
    container: 'body'
  });
});
