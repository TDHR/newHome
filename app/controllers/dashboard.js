/**
 * 登录
 */

var express = require('express');
var router = express.Router();

module.exports = function(app) {
  app.use('/', router);
};

// 我的资产
router.get('/user/dashboard', function(req, res) {
  res.render('platform/dashboard', {
    nav: 'dashboard'
  });
});

// 钱包详情
router.get('/wallet/:wid', function(req, res) {
  res.render('platform/wallet', {
    nav: 'dashboard'
  });
});

// 绑定钱包
router.get('/user/bind-wallet', function(req, res) {
  res.render('platform/bind-wallet', {
    nav: 'dashboard'
  });
});

// 修改分红地址
router.get('/user/update-dividend', function(req, res) {
  res.render('platform/update-dividend', {
    nav: 'dashboard'
  });
});


// 系统通知
router.get('/notification', function(req, res) {
  res.render('platform/notification', {
    nav: 'notification'
  });
});

// 个人信息
router.get('/user/info', function(req, res) {
  res.render('platform/info', {
    nav: 'info'
  });
});

// 账户安全
router.get('/user/safety', function(req, res) {
  res.render('platform/safety', {
    nav: 'safety'
  });
});