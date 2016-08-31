/**
 * 登录
 */

var express = require('express');
var router = express.Router();

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
  // TODO: 1. 转发到 PHP 后端，并将返回的结果转发给前端
  //       2. 存储登录用户的信息
  return res.json({
    success: true,
    msg: '',
    data: body
  });
});
