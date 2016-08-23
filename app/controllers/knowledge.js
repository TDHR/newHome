var express = require('express');
var router = express.Router();
var request = require('superagent');
var config = require('../../config/config');

module.exports = function(app) {
  app.use('/', router);
};

router.get('/knowledge/:pageNumber?', function(req, res) {
  var page = req.params.pageNumber || 1;
  request
    .get(config.weixin + '/ArticleOut/GetList')
    .send({
      language: req.getLocale() || 'zh',
      page: page,
      limit: 5
    })
    .end(function(err, result) {
      var data = '';
      if (result.body.success) {
        data = result.body.data;
      }
      res.render('knowledge/index', {
        nav: 'knowledge',
        articleData: data
      });
    });
});

router.get('/knowledge/article/:articleID', function(req, res) {
  request
    .get(config.weixin + '/ArticleOut/GetDetail')
    .send({
      language: req.getLocale() || 'zh',
      id: req.params.articleID
    })
    .end(function(err, result) {
      var data = '';
      if (result.body.success) {
        data = result.body.data;
      }
      res.render('knowledge/article', {
        nav: 'knowledge',
        data: data
      });
    });
});
