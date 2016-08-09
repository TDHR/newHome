var express = require('express');
var router = express.Router();

module.exports = function(app) {
  app.use('/', router);
};

router.get('/contact', function(req, res, next) {
  res.render('contact/index', {
    nav: 'contact'
  });
});