var express = require('express');
var router = express.Router();
var Article = require('../models/article');

module.exports = function(app) {
  app.use('/', router);
};

router.get('/', function(req, res, next) {
  res.render('home/index', {
    nav: 'home',
    articles: Article
  });
});