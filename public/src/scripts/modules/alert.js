/**
 * alert.js
 * [提示消息]
 * @param {string} [msg] [提示消息。为'hide'时隐藏提示条]
 * @param {number} [countdown] [多少秒后关闭]
 */
export default (msg, countdown) => {
  const holder = $('#alertHolder');
  const inside = $('#alertDefault');

  clearTimeout(window.alertCountdown);

  let html = msg;
  if (msg === 'hide') {
    html = '';
    holder.addClass('hide');
  } else {
    holder.removeClass('hide');
  }
  inside.html(html);

  const hideAlert = () => {
    inside.html('');
    holder.addClass('hide');
  };

  if (countdown) {
    window.alertCountdown = setTimeout(() => {
      hideAlert();
    }, countdown);
  }
};
