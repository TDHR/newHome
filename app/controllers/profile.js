var request = require('superagent');
var async = require('async');
var config = require('../../config/config');

// 「个人信息」页面
exports.index = function(req, res) {
  var userToken = req.cookies.userToken;
  async.auto({
    // 获取用户信息
    getUserInfo: function(cb) {
      request
        .get(config.platform + '/api/vipuser/getuserinfo')
        .query({token: userToken})
        .set('Accept', 'application/json')
        .end(function(err, result) {   
          cb(null, result);
        });
    }
  }, function(err, results) {
    var user = results.getUserInfo;
    // 未登录、登录超时
    if (!user || !user.body || user.body.code === 1) {
      res.clearCookie('userToken');
      return res.redirect('/login');
    }
    res.render('platform/profile', {
      layout: 'platform',
      nav: 'profile',
      user: user.body.data
    });
  });
};


// 更新个人信息
exports.update = function(req, res) {
  request
    .post(config.platform + '/api/vipuser/updateuser')
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
