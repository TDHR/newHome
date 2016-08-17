var express = require('express');
var router = express.Router();
var Article = require('../models/article');

module.exports = function(app) {
  app.use('/', router);
};

router.get('/knowledge', function(req, res) {
  res.render('knowledge/index', {
    nav: 'knowledge',
    articles: Article
  });
});

router.get('/knowledge/:articleID', function(req, res) {
  res.render('knowledge/article', {
    nav: 'knowledge',
    article: Article[req.params.articleID]
  });
});
