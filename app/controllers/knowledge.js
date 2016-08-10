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

router.get('/article', function(req, res) {
  var id = req.query.id;
  res.render('knowledge/article', {
    nav: 'article',
    article: Article[id]
  });
});
