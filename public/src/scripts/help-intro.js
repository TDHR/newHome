// plugin
import Cookies from 'cookies-js';

// modules
import ChangeLanguage from './modules/change-language';

// 语言切换按钮
$('#languageBtn').on('click', function() {
  ChangeLanguage($(this).data('language') === 'zh' ? 'en' : 'zh');
});

Reveal.initialize({
  center: true,
  history: true,
  transition: 'linear',
  loop: true
});

Reveal.addEventListener('ready', function(event) {
  ctrAnimate(event.indexh);
});

Reveal.addEventListener('slidechanged', function(event) {
  ctrAnimate(event.indexh);
});

/**
 * [控制各页的动画]
 * @param {[string]} [page] [当前的页数]
 */
function ctrAnimate(page) {
  $('.show-it').removeClass('show-it');
  $('.intro-coin').removeClass('coin-drop');
  $('.rotatey').removeClass('rotatey');
  switch (page) {
    case 2:
      $('#picAsset1').addClass('show-it');
      $('#picAsset2').addClass('show-it');
      break;
    case 3:
      $('#iconSurvey').addClass('show-it');
      break;
    case 4:
      $('#iconCheck').addClass('show-it');
      break;
    case 5:
      $('#iconFinance').addClass('show-it');
      break;
    case 7:
      $('#iconChose').addClass('show-it');
      break;
    case 8:
      progress();
      break;
    case 9:
      $('#iconWallet').addClass('show-it');
      setTimeout(function() {
        $('.intro-coin').addClass('coin-drop');
      }, 500);
      break;
    case 11:
      $('#picTrade').addClass('show-it');
      break;
    case 12:
      $('#iconCatcher').addClass('show-it');
      $('.icon-catcher-coin').addClass('show-it');
      break;
    case 13:
      $('#picRts').addClass('rotatey');
      $('#picRmb').addClass('rotatey');
      break;
  }
}

/**
 * [进度条]
 */
function progress() {
  var per = $('#iconProgress .percentage');
  var bar = $('#iconProgress .bar');
  var num = 0;

  per.text('0%');
  bar.css('width', 0);

  var work = () => {
    if (num < 100) {
      num++;
      per.text(`${num}%`);
      bar.css('width', `${num}%`);
      window.PROGRESS_TIMEOUT = setTimeout(() => {
        work();
      }, 10);
    }
  };
  work();
}
