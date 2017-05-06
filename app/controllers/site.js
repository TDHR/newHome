var request = require('superagent');
var config = require('../../config/config');

// 首页
exports.index = function(req, res) {
  res.render('site/home', {
    layout: '',
    nav: 'home'
  });
};

// 服务条款
exports.terms = function(req, res) {
  res.render('site/terms', {
    nav: ''
  });
};

// 关于 POS
exports.helpPos = function(req, res) {
  res.render('site/help-pos', {
    nav: ''
  });
};

// 公测-微信分享页面
exports.shareWeChat = function(req, res) {
  var userToken = req.cookies.userToken;
  var wechat = res.locals.wechat;

  // 已经登录
  if (userToken) {
    // 获取邀请码
    request
      .get(config.platform + '/api/vipuser/getinvitecode')
      .query({ token: userToken })
      .set('Accept', 'application/json')
      .end(function(err, result) {
        var inviteCode = '';
        // 登录超时
        if (!result || !result.body || result.body.code === 1) {
          res.clearCookie('userToken');
        } else {
          inviteCode = result.body.data.inviteCode;
        }
        res.render('site/share-wechat', {
          layout: '',
          wechat: wechat,
          inviteCode: inviteCode
        });
      });
  } else {
    res.render('site/share-wechat', {
      layout: '',
      wechat: wechat,
      inviteCode: ''
    });
  }
};

// 通过手机号码获取邀请码
exports.getInviteCode = function(req, res) {
  request
    .get(config.platform + '/papi/share/getinvitecode')
    .query({ username: req.body.username })
    .set('Accept', 'application/json')
    .end(function(err, result) {
      var body = result.body;
      return res.json({
        success: body.success,
        code: body.code,
        msg: body.message,
        data: body.data
      });
    });
};

// 公测介绍页面
exports.betaIntro = function(req, res) {
  res.render('site/beta-intro', {
    nav: ''
  });
};
