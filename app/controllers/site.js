var request = require('superagent');
var config = require('../../config/config');

// 首页
exports.index = function(req, res) {
  res.render('site/home', {
    layout: 'explorer',
    nav: 'home'
  });
};

// 服务条款
exports.terms = function(req, res) {
  res.render('site/terms', {
    nav: 'terms'
  });
};

// 关于 POS
exports.helpPos = function(req, res) {
  res.render('site/help-pos', {
    nav: 'help-pos'
  });
};

// 公测介绍页面
exports.betaIntro = function(req, res) {
  request
    .get(config.platform + '/site/getwalletversion')
    .set('Accept', 'application/json')
    .end(function(err, result) {
      res.render('site/beta-intro', {
        nav: '',
        walletVersion: result ? result.body.data : null
      });
    });
};

// 下载钱包页面
exports.downloads = function(req, res) {
  request
    .get(config.platform + '/papi/pwallet/getappdownurl')
    .set('Accept', 'application/json')
    .end(function(err, result) {
      var body = result.body;
      res.render('site/downloads', {
        layout: 'explorer',
        nav: 'downloads',
        data: body.data
      });
    });
};

// 下载文件
exports.download = function(req, res) {
  var type = req.params.type;
  var name = req.params.name;
  var filepath = config.root + '/public/downloads/' + type + '/' + name;
  res.download(filepath);
};

// ico
exports.ico = function(req, res) {
  res.render('site/ico', {
    nav: 'ico'
  });
};

//下载跳转页面
exports.go = function (req, res) {
  res.render('site/download-go', {
    layout: '',
    nav: 'go',
    data: 'www.baidu.com'
  })
};
// 跳转到登录页面
exports.goLogin = function (req, res) {
      res.render('site/login', {
        layout: '',
        nav: 'login'
    });
};
//获取验证码
exports.getCode = function(req, res) {
  request
    .get(config.platform + 'papi/pwallet/getphonevalidcode_login')
    .query({
      phoneNum: req.query.username
    })
    .set('Accept', 'application/json')
    .end(function(err, result){
      var body = result.body;
      return res.json({
        success : body.success,
        code: body.code,
        message: body.message
      })
    })
};
// 点击登录
exports.doLogin = function (req, res) {

  request
    .post(config.platform + 'papi/puser/dologin')
    .query({
      username: req.query.username,
      password: req.query.psw,
      validateCode: req.query.telCode,
      loginType: 0,
      version: '3.1.6'
    })
    .set('Accept', 'application/json')
    .end(function(err, result) {
        var body = result.body;

          return res.json({
            success: body.success,
            code: body.code,
            token: body.token,
            realName: body.realName,
            message: body.message
          });

    })
};
// 跳转到收集页面
exports.collection = function (req, res) {
  res.render('site/collectionMessage', {
    layout: '',
    nav: 'collection'
  });
};

// 提交银行卡信息
exports.subBankMessage = function (req, res) {
  request
    .post(config.platform + 'api/vipuser/setBankCard')
    .query({
      token: req.query.token,
      bankCardNum: req.query.bankCardNum,
      openBankName: req.query.openBankName,
      bankAddress: req.query.bankAddress
    })
    .set('Accept', 'application/json')
    .end(function(err, result) {
      var body = result.body;
      return res.json({
        success: body.success,
        message: body.message
      })
    })
}


