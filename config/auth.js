/**
 * 需要登录
 */
exports.needToLogin = function(req, res, next) {
  var token = req.cookies.userToken;
  if (!token) {
    return res.redirect('/');
  }
  next();
};

exports.shareNeedToLogin = function(req, res, next) {
  var token = req.cookies.userToken;
  if (!token) {
    return res.redirect('/login?share=wechat');
  }
  next();
};

/**
 * 无需登录
 * 登录后无法访问登录、注册、找回密码
 */
exports.doNotNeedLogin = function(req, res, next) {
  var token = req.cookies.userToken;
  if (token) {
    return res.redirect('/user/dashboard');
  }
  next();
};

/**
 * 是否已登录（针对 ajax 请求）
 */
exports.hasLogged = function(req, res, next) {
  var token = req.cookies.userToken;
  if (!token) {
    return res.json({
      success: false,
      msg: '请先登录',
      code: -1
    });
  }
  next();
};
