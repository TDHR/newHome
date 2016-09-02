/**
 * 账户安全
 */

var express = require('express');
var router = express.Router();

module.exports = function(app) {
  app.use('/', router);
};

// 账户安全
router.get('/user/safety', function(req, res) {
  res.render('platform/safety', {
    nav: 'safety'
  });
});
