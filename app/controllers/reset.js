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