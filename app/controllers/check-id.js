/**
 * 查看实名认证信息
 */

var express = require('express');
var router = express.Router();

module.exports = function(app) {
  app.use('/', router);
};

router.get('/check-id', function(req, res) {
  res.render('platform/check-id', {
    nav: 'safety'
  });
});
