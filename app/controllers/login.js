var request = require('superagent');
var async = require('async');
var config = require('../../config/config');

// 登录页面
exports.index = function(req, res) {
  res.render('platform/login', {
    layout: 'platform',
    nav: 'login'
  });
};

// 登录接口
exports.login = function(req, res) {
  var body = req.body;
  var ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/);
  ip = ip ? ip[0] : null;

  async.auto({
    getIpInfo: function(cb) {
      if (ip) {
        request
          .get('http://ip.taobao.com/service/getIpInfo.php')
          .query({ip: ip})
          .set('Accept', 'application/json')
          .end(function(err, result) {
            if (err) {
              cb(null, {
                data: {
                  city: ""
                }
              });
            } else {
              cb(null, JSON.parse(result.text));
            }
          });
      } else {
        cb(null, {
          data: {
            city: ""
          }
        });
      }
    },
    sendToSever: ['getIpInfo', function(results, cb) {
      var ipInfo = results.getIpInfo.data;
      var location = ipInfo.city;
      request
        .post(config.platform + '/api/login/dologin')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json')
        .send({
          username: body.username,
          password: body.password,
          validateCode: body.validateCode || '',
          ip: ip,
          location: ipInfo.city,
          token: body.token
        })
        .end(function(err, result) {
          cb(null, result);
        });
    }]
  }, function(err, results) {
    var body = results.sendToSever.body;
    if (body.success) {
      // 存储 token 到 cookie，保留24小时
      res.cookie('userToken', body.token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: false });
    }
    return res.json({
      success: body.success,
      msg: body.message,
      code: body.code,
      loginTimes: body.loginTimes,
      userToken: body.token
    });
  });
};

// 获取验证码
exports.captcha = function(req, res) {
  request
    .get(config.platform + '/api/login/getvalidcode')
    .set('Accept', 'application/json')
    .end(function(err, result) {
      var body = result.body;
      return res.json({
        success: body.success,
        msg: body.message,
        code: body.code,
        imageurl: body.imageurl,
        token: body.token
      });
    });
};

// 登出
exports.logout = function(req, res) {
  request
    .get(config.platform + '/api/login/dologinout')
    .set('Accept', 'application/json')
    .end(function(err, result) {
      //清除 cookie
      res.clearCookie('userToken');
      res.redirect('/login');
    });
};
