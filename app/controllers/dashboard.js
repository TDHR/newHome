var request = require('superagent');
var async = require('async');
var config = require('../../config/config');

// 我的资产
exports.index = function(req, res) {
  var userToken = req.cookies.userToken;
  async.auto({
    // 获取用户信息
    getUserInfo: function(cb) {
      request
        .get(config.platform + '/api/vipuser/getuserinfo?token=' + userToken)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json')
        .end(function(err, result) {   
          cb(null, result);
        });
    },
    // 获取资产
    getAsset: function(cb) {
      request
        .get(config.platform + '/api/vipuser/getasset?token=' + userToken)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json')
        .end(function(err, result) {   
          cb(null, result);
        });
    }
  }, function(err, results) {
    var user = results.getUserInfo.body;
    var asset = results.getAsset.body;

    // 未登录、登录超时
    if (user.code === 1) {
      res.clearCookie('userToken');
      return res.redirect('/login');
    }

    res.render('platform/dashboard', {
      nav: 'dashboard',
      user: user.data,
      asset: asset.data
    });
  });
};

// 钱包详情
exports.wallet = function(req, res) {
  res.render('platform/wallet', {
    nav: 'dashboard'
  });
};

// 绑定钱包
exports.bindWallet = function(req, res) {
  res.render('platform/bind-wallet', {
    nav: 'dashboard'
  });
};

// 修改分红地址
exports.updateDividend = function(req, res) {
  res.render('platform/update-dividend', {
    nav: 'dashboard'
  });
};
