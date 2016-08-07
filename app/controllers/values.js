var express = require('express');
var router = express.Router();

module.exports = function(app) {
  app.use('/values', router);
};

router.get('/', function(req, res, next) {
  res.render('values/index');
});