var request = require('superagent');
var async = require('async');
var config = require('../../config/config');

// 「邀请奖励」页面
exports.index = function(req, res) {
  res.render('platform/invitation-to-reward', {
    layout: 'platform',
    nav: 'invitation-to-reward'
  });
};
