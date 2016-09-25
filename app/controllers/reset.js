var request = require('superagent');
var async = require('async');
var config = require('../../config/config');

// 「忘记密码」页面
exports.index = function(req, res) {
  res.render('platform/reset', {
    nav: 'reset'
  });
};

// 「忘记密码」接口
exports.reset = function(req, res) {
  request
    .post(config.platform + '/api/vipuser/forgetpassword')
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
