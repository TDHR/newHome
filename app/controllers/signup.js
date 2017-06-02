var request = require('superagent');
var async = require('async');
var config = require('../../config/config');

// 注册页面
exports.index = function(req, res) {
  var invite = req.query.i;
  res.render('platform/signup', {
    layout: 'platform',
    nav: 'signup',
    invite: invite
  });
};

// 注册接口
exports.signup = function(req, res) {
  request
    .post(config.platform + '/user/register')
    .set('Accept', 'application/json')
    .send({
      username: req.body.phoneNum,
      password: req.body.password,
      verifyCode: req.body.phoneValidCode,
      key: req.body.key,
      imageCode: req.body.imageCode
    })
    .end(function(err, result) {
      var body = result.body;
      return res.json({
        success: body.success,
        code: body.code,
        msg: body.message,
        data: body.data
      });
    });
};

// 获取图片验证码
exports.getImageCode = function(req, res) {
  request
    .get(config.platform + '/user/getimages')
    .set('Accept', 'application/json')
    .end(function(err, result) {
      var body = result.body;
      return res.json({
        success: body.success,
        code: body.code,
        msg: body.message,
        data: body.data
      });
    });
};
