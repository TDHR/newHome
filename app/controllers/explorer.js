var express = require('express');
var router = express.Router();
var Explorer = require('../models/explorer');

module.exports = function(app) {
  app.use('/', router);
};

router.get('/explorer/:chainID', function(req, res) {
  res.render('explorer/index', {
    layout: 'explorer',
    nav: 'explorer',
    data: Explorer,
    chainID: req.params.chainID
  });
});

router.get('/explorer/:chainID/user/:userID', function(req, res) {
  res.render('explorer/user-info', {
    layout: 'explorer',
    nav: 'explorer'
  });
});

router.get('/explorer/:chainID/transaction/:transactionID', function(req, res) {
  res.render('explorer/transaction', {
    layout: 'explorer',
    nav: 'explorer'
  });
});
