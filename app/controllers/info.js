// 「个人信息」页面
exports.index = function(req, res) {
  res.render('platform/info', {
    nav: 'info'
  });
};
