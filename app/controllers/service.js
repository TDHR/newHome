var express = require('express');
var router = express.Router();

module.exports = function(app) {
  app.use('/', router);
};

router.get('/service', function(req, res) {
  res.render('service/index', {
    nav: 'service'
  });
});