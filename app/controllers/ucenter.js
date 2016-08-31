/**
 * 登录
 */

var express = require('express');
var router = express.Router();

module.exports = function(app) {
  app.use('/', router);
};

router.get('/ucenter', function(req, res) {
  res.render('platform/ucenter', {
    nav: 'ucenter'
  });
});
