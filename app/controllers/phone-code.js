var request = require('superagent');
var config = require('../../config/config');

// 注册接口
exports.default = function(req, res) {
  var body = req.body;
  request
    .get(config.platform + '/wallet/user/verifycode')
    .set('Accept', 'application/json')
    .query({
      smsType: body.smsType,
      phone: body.phoneNum,
      type: body.type,
      imageCode: body.imageCode,
      key: body.key
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