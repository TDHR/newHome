var request = require('superagent');
var async = require('async');
var config = require('../../config/config');

// 账户安全页面
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
    // 获取登录信息
    getLoginInfo: function(cb) {
      request
        .get(config.platform + '/api/vipuser/getloginlog?token=' + userToken)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json')
        .end(function(err, result) {
          cb(null, result);
        });
    }
  }, function(err, results) {
    var user = results.getUserInfo.body;
    var loginInfo = results.getLoginInfo.body;
    // 未登录、登录超时
    if (user.code === 1) {
      res.clearCookie('userToken');
      return res.redirect('/login');
    }
    res.render('platform/security', {
      layout: 'platform',
      nav: 'security',
      user: user.data,
      loginInfo: loginInfo.data
    });
  });
};

// 「修改密码」页面
exports.pwd = function(req, res) {
  res.render('platform/modify-password', {
    layout: 'platform',
    nav: 'security'
  });
};

// 「修改密码」接口
exports.modifyPwd = function(req, res) {
  request
    .post(config.platform + '/api/vipuser/updatepassword')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Accept', 'application/json')
    .send(req.body)
    .end(function(err, result) {
      var body = result.body;
      return res.json({
        success: body.success,
        code: body.code,
        msg: body.message
      });
    });
};

// 「修改手机」页面
exports.phone = function(req, res) {
  res.render('platform/modify-phone', {
    layout: 'platform',
    nav: 'security'
  });
};

// 「修改手机」接口
exports.modifyPhone = function(req, res) {
  // request
  //   .post(config.platform + '/api/vipuser/updatepassword')
  //   .set('Content-Type', 'application/x-www-form-urlencoded')
  //   .set('Accept', 'application/json')
  //   .send(req.body)
  //   .end(function(err, result) {
  //     var body = result.body;
  //     return res.json({
  //       success: body.success,
  //       code: body.code,
  //       msg: body.message
  //     });
  //   });
};

// 查看实名认证信息
exports.viewId = function(req, res) {
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
    }
  }, function(err, results) {
    var user = results.getUserInfo.body;
    // 未登录、登录超时
    if (user.code === 1) {
      res.clearCookie('userToken');
      return res.redirect('/login');
    }
    res.render('platform/view-id', {
      layout: 'platform',
      nav: 'security',
      user: user.data
    });
  });
};

// 「更新实名认证」页面
exports.verifyId = function(req, res) {
  res.render('platform/verify-id', {
    layout: 'platform',
    nav: 'security'
  });
};

// 「更新实名认证」接口
exports.verifyIdPost = function(req, res) {
  request
    .post(config.platform + '/api/vipuser/updateuserimage')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Accept', 'application/json')
    .send(req.body)
    .end(function(err, result) {
      var body = result.body;
      return res.json({
        success: body.success,
        code: body.code,
        msg: body.message
      });
    });
}

// 查看银行卡信息
exports.viewBankCard = function(req, res) {
  var userToken = req.cookies.userToken;
  res.render('platform/view-bank-card', {
    layout: 'platform',
    nav: 'security'
  });
};

// 「银行卡认证」页面
exports.verifyBankCard = function(req, res) {
  res.render('platform/verify-bank-card', {
    layout: 'platform',
    nav: 'security'
  });
};

// 「银行卡认证」接口
exports.verifyBankCardPost = function(req, res) {
  
}

// 「风险承受能力评估」页面
exports.riskTolerance = function(req, res) {
  res.render('platform/risk-tolerance', {
    layout: 'platform',
    nav: 'security'
  });
};

// 「风险承受能力评估」提交接口
exports.riskTolerancePost = function(req, res) {

};
