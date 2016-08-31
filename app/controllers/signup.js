/**
 * 注册
 */

var express = require('express');
var router = express.Router();

module.exports = function(app) {
  app.use('/', router);
};

router.get('/signup', function(req, res) {
  res.render('platform/signup', {
    nav: 'signup'
  });
});