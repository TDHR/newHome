/**
 * alert.js
 * [提示消息]
 * @param {string} [msg] [提示消息。为'hide'时隐藏提示条]
 * @param {number} [countdown] [多少秒后关闭, 0或空为不关闭]
 * @param {string} [type] [类型，默认为 danger，可选择 success、warning、info]
 */
export default (msg, countdown, type) => {
  let holder = $('#alertHolder');
  let inside = $('#alertDefault');
  type = `alert-${(type || 'danger')}`;

  clearTimeout(window.alertCountdown);

  let html = msg;
  if (msg === 'hide') {
    html = '';
    holder.addClass('hide');
  } else {
    holder.removeClass('hide');
  }
  inside.attr('class', `alert ${type}`);
  inside.html(html);

  let hideAlert = () => {
    inside.html('');
    holder.addClass('hide');
  };

  if (countdown) {
    window.alertCountdown = setTimeout(() => {
      hideAlert();
    }, countdown);
  }
};
