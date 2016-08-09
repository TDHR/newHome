var express = require('express');
var router = express.Router();

module.exports = function(app) {
  app.use('/', router);
};

router.get('/values', function(req, res, next) {
  res.render('values/index', {
    nav: 'values'
  });
});