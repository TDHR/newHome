var request = require('superagent');
var config = require('../../config/config');

// 注册接口
exports.default = function(req, res) {
  request
    .post(config.platform + '/api/vipuser/getphonevalidcode')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Accept', 'application/json')
    .send({
      phoneNum: req.body.phoneNum
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