/**
 * 系统通知
 */

var express = require('express');
var router = express.Router();

module.exports = function(app) {
  app.use('/', router);
};

// 个人信息
router.get('/user/info', function(req, res) {
  res.render('platform/info', {
    nav: 'info'
  });
});
