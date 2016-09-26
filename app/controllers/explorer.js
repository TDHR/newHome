var request = require('superagent');
var async = require('async');
var config = require('../../config/config');

exports.angels = function(req, res) {
  res.render('explorer/angels', {
    nav: 'explorer'
  });
};
