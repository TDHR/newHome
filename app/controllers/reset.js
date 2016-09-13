// 「忘记密码」页面
exports.index = function(req, res) {
  res.render('platform/reset', {
    nav: 'reset'
  });
};

// 「忘记密码」接口
exports.reset = function(req, res) {
  var body = req.body;
  // TODO: 1. 转发到 PHP 后端，并将返回的结果转发给前端
  return res.json({
    success: true,
    msg: '',
    data: body
  });
};
