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
    .post(config.platform + '/api/vipuser/register')
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
