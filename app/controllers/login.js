/**
 * 登录
 */

var express = require('express');
var router = express.Router();
var request = require('superagent');
var async = require('async');

module.exports = function(app) {
  app.use('/', router);
};

// 登录页面
router.get('/login', function(req, res) {
  res.render('platform/login', {
    nav: 'login'
  });
});

// 登录表单
router.post('/login', function(req, res) {
  var body = req.body;
  var ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/);
  ip = ip ? ip[0] : null;

  // fake ip
  ip = '115.28.143.213';

  async.auto({
    getIpInfo: function(cb) {
      if (ip) {
        request
          .get('http://ip.taobao.com/service/getIpInfo.php?ip=' + ip)
          .set('Accept', 'json')
          .end(function(err, result) {
            if (err) {
              cb(null, {
                data: {
                  country: "",
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
            country: "",
            city: ""
          }
        });
      }
    }
  }, function(cb, results) {
    var ipInfo = results.getIpInfo.data;
    var country = ipInfo.country;
    var city = ipInfo.city;
    console.log(country, city);

    // TODO: 1. 转发到 Java 后端，并将返回的结果转发给前端
    //       2. 存储登录用户的信息
    return res.json({
      success: true,
      msg: '',
      data: body
    });
  });
});
