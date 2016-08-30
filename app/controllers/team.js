var express = require('express');
var router = express.Router();

module.exports = function(app) {
  app.use('/', router);
};

router.get('/team', function(req, res) {
  res.render('team/index', {
    nav: 'team'
  });
});