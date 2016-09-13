// 账户安全页面
exports.index = function(req, res) {
  res.render('platform/safety', {
    nav: 'safety'
  });
};

// 修改密码
exports.modifyPwd = function(req, res) {
  res.render('platform/modify-password', {
    nav: 'safety'
  });
};

// 查看实名认证信息
exports.checkId = function(req, res) {
  res.render('platform/check-id', {
    nav: 'safety'
  });
};
