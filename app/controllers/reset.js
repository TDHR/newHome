/**
 * 忘记密码
 */

var express = require('express');
var router = express.Router();

module.exports = function(app) {
  app.use('/', router);
};

router.get('/reset', function(req, res) {
  res.render('platform/reset', {
    nav: 'reset'
  });
});

// 忘记密码
router.post('/reset', function(req, res) {
  var body = req.body;
  // TODO: 1. 转发到 PHP 后端，并将返回的结果转发给前端
  return res.json({
    success: true,
    msg: '',
    data: body
  });
});