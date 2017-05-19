var request = require('superagent');
var config = require('../../config/config');

// 注册接口
exports.default = function(req, res) {
  request
    .get(config.platform + '/user/verifyCode')
    .set('Accept', 'application/json')
    .query({
      smsType: 1,
      phone: req.body.phoneNum
    })
    .end(function(err, result) {
      var body = result.body;
      return res.json({
        success: body.success,
        code: body.code,
        msg: body.message
      });
    });
};