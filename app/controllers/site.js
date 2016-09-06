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
  res.render('site/home', {
    nav: 'home'
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
  res.render('site/knowledge', {
    nav: 'knowledge'
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
      if (result && result.body.success) {
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

// 获取文章
router.get('/articles', function(req, res) {
  var page = req.query.page || 1;
  var limit = req.query.limit || 4;
  request
    .get(config.weixin + '/ArticleOut/GetList')
    .send({
      language: req.getLocale() || 'zh',
      page: page,
      limit: limit
    })
    .end(function(err, result) {
      var articleData = '';
      if (result && result.body.success) {
        return res.json({
          success: true,
          data: result.body.data
        });
      } else {
        return res.json({
          success: false
        });
      }
    });
});
