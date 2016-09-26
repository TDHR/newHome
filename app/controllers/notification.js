// 系统通知
exports.index = function(req, res) {
  res.render('platform/notification', {
    nav: 'notification'
  });
};

// 系统通知内容
exports.detail = function(req, res) {
  res.render('platform/notification-detail', {
    nav: 'notification'
  });
};
