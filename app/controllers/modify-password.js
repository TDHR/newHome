/**
 * 修改密码
 */

var express = require('express');
var router = express.Router();

module.exports = function(app) {
  app.use('/', router);
};

router.get('/modify-password', function(req, res) {
  res.render('platform/modify-password', {
    nav: 'safety'
  });
});
