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
  $('.show-icon').removeClass('show-icon');
  $('.intro-coin').removeClass('coin-drop');
  $('.rotatey').removeClass('rotatey');
  switch (page) {
    case 2:
      $('#iconSignUp').addClass('show-icon');
      break;
    case 3:
      $('#iconSurvey').addClass('show-icon');
      break;
    case 4:
      $('#iconCheck').addClass('show-icon');
      break;
    case 5:
      $('#iconFinance').addClass('show-icon');
      break;
    case 7:
      $('#iconChose').addClass('show-icon');
      break;
    case 8:
      progress();
      break;
    case 9:
      $('#iconWallet').addClass('show-icon');
      setTimeout(function() {
        $('.intro-coin').addClass('coin-drop');
      }, 1000);
      break;
    case 11:
      break;
    case 12:
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
