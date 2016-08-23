var express = require('express');
var router = express.Router();
var request = require('superagent');
var config = require('../../config/config');

module.exports = function(app) {
  app.use('/', router);
};

router.get('/', function(req, res) {
  var page = req.query.page || 1;
  request
    .get(config.weixin + '/ArticleOut/GetList')
    .send({
      language: req.getLocale() || 'zh',
      page: page,
      limit: 4
    })
    .end(function(err, result) {
      var articleData = '';
      if (result.body.success) {
        articleData = result.body.data;
      }
      res.render('home/index', {
        nav: 'home',
        articleData: articleData
      });
    });
});
