var express = require('express');
var router = express.Router();
var Article = require('../models/article');

module.exports = function(app) {
  app.use('/knowledge', router);
};

router.get('/', function(req, res, next) {
  res.render('knowledge/index', {
    nav: 'knowledge',
    articles: Article
  });
});