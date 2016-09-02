/**
 * 系统通知
 */

var express = require('express');
var router = express.Router();

module.exports = function(app) {
  app.use('/', router);
};

// 系统通知
router.get('/notification', function(req, res) {
  res.render('platform/notification', {
    nav: 'notification'
  });
});

// 系统通知内容
router.get('/notification/:id', function(req, res) {
  res.render('platform/notification-detail', {
    nav: 'notification'
  });
});
