/**
 * 登录
 */

var express = require('express');
var router = express.Router();
var request = require('superagent');
var async = require('async');
var config = require('../../config/config');

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
        .send({
          username: body.username,
          password: body.password,
          validateCode: body.validateCode || '',
          ip: ip,
          location: ipInfo.city
        })
        .end(function(err, result) {
          cb(null, result);
        });
    }]
  }, function(err, results) {
    var serverData = results.sendToSever;
    console.log(serverData);
    if (serverData && serverData.body.success) {

    }
    // return res.json({
    //   success: true,
    //   msg: '',
    //   data: body
    // });
  });
});
