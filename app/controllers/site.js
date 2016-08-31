/**
 * 官网相关页面
 */

var express = require('express');
var router = express.Router();
var request = require('superagent');
var config = require('../../config/config');

module.exports = function(app) {
  app.use('/', router);
};

// 首页
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
      res.render('site/home', {
        nav: 'home',
        articleData: articleData
      });
    });
});

// 核心价值
router.get('/values', function(req, res) {
  res.render('site/values', {
    nav: 'values'
  });
});

// 服务
router.get('/service', function(req, res) {
  res.render('site/service', {
    nav: 'service'
  });
});

// 团队
router.get('/team', function(req, res) {
  res.render('site/team', {
    nav: 'team'
  });
});

// 知识库
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
      res.render('site/knowledge', {
        nav: 'knowledge',
        articleData: data
      });
    });
});

// 文章内容
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
      res.render('site/article', {
        nav: 'knowledge',
        data: data
      });
    });
});

// 联系我们
router.get('/contact', function(req, res) {
  res.render('site/contact', {
    nav: 'contact'
  });
});