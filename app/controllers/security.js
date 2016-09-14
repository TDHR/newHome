// 账户安全页面
exports.index = function(req, res) {
  res.render('platform/security', {
    nav: 'security'
  });
};

// 修改密码
exports.modifyPwd = function(req, res) {
  res.render('platform/modify-password', {
    nav: 'security'
  });
};

// 查看实名认证信息
exports.checkId = function(req, res) {
  res.render('platform/check-id', {
    nav: 'security'
  });
};
