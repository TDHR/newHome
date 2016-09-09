/**
 * 注册
 */
var express = require('express');
var router = express.Router();
var request = require('superagent');
var config = require('../../config/config');

module.exports = function(app) {
  app.use('/', router);
};

router.get('/signup', function(req, res) {
  res.render('platform/signup', {
    nav: 'signup'
  });
});

// 注册
router.post('/signup', function(req, res) {
  // TODO: 1. 转发到 Java 后端，并将返回的结果转发给前端
  // return res.json({
  //   success: true,
  //   msg: ''
  // });
});
