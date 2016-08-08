var express = require('express');
var router = express.Router();

module.exports = function(app) {
  app.use('/team', router);
};

router.get('/', function(req, res, next) {
  res.render('team/index');
});