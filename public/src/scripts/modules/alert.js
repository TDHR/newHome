/**
 * alert.js
 * [提示消息]
 * @param {string} [msg] [提示消息。为'hide'时隐藏提示条]
 * @param {number} [countdown] [多少秒后关闭, 0或空为不关闭]
 * @param {string} [type] [类型，默认为 danger，可选择 success、warning、info]
 * @param {function} [cb] [callback]
 */
export default (msg, countdown, type, cb) => {
  let holder = $('#alertHolder');
  let inside = $('#alertDefault');
  type = `alert-${(type || 'danger')}`;

  clearTimeout(window.alertCountdown);

  let hide = () => {
    inside.html('');
    holder.addClass('hide');
  };

  let show = () => {
    inside.html(msg);
    holder.removeClass('hide');
    inside.attr('class', `alert ${type}`);
  };

  let callback = () => {
    if (typeof cb === 'function') {
      cb();
    }
  }

  if (msg === 'hide') {
    hide();
    callback();
  } else {
    show();
  }

  if (countdown) {
    window.alertCountdown = setTimeout(() => {
      hide();
      callback();
    }, countdown);
  } else {
    callback();
  }
};
