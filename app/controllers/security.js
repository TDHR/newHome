var request = require('superagent');
var async = require('async');
var config = require('../../config/config');

// 账户安全页面
exports.index = function(req, res) {
  var userToken = req.cookies.userToken;
  async.auto({
    // 获取用户信息
    getUserInfo: function(cb) {
      request
        .get(config.platform + '/api/vipuser/getuserinfo?token=' + userToken)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json')
        .end(function(err, result) {   
          cb(null, result);
        });
    },
    // 获取登录信息
    getLoginInfo: function(cb) {
      request
        .get(config.platform + '/api/vipuser/getloginlog?token=' + userToken)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json')
        .end(function(err, result) {   
          cb(null, result);
        });
    }
  }, function(err, results) {
    var user = results.getUserInfo.body;
    var loginInfo = results.getLoginInfo.body;
    // 未登录、登录超时
    if (user.code === 1) {
      res.clearCookie('userToken');
      return res.redirect('/login');
    }
    res.render('platform/security', {
      nav: 'security',
      user: user.data,
      loginInfo: loginInfo.data
    });
  });
};

// 「修改密码」页面
exports.pwd = function(req, res) {
  res.render('platform/modify-password', {
    nav: 'security'
  });
};

// 「修改密码」接口
exports.modifyPwd = function(req, res) {
  request
    .post(config.platform + '/api/vipuser/updatepassword')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Accept', 'application/json')
    .send(req.body)
    .end(function(err, result) {
      var body = result.body;
      return res.json({
        success: body.success,
        code: body.code,
        msg: body.message
      });
    });
};

// 查看实名认证信息
exports.view = function(req, res) {
  var userToken = req.cookies.userToken;
  async.auto({
    // 获取用户信息
    getUserInfo: function(cb) {
      request
        .get(config.platform + '/api/vipuser/getuserinfo?token=' + userToken)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json')
        .end(function(err, result) {   
          cb(null, result);
        });
    }
  }, function(err, results) {
    var user = results.getUserInfo.body;
    // 未登录、登录超时
    if (user.code === 1) {
      res.clearCookie('userToken');
      return res.redirect('/login');
    }
    res.render('platform/view-id', {
      nav: 'security',
      user: user.data
    });
  });
};
