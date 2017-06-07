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

// 下载文件
exports.download = function(req, res) {
  var type = req.params.type;
  var name = req.params.name;
  var filepath = config.root + '/public/downloads/' + type + '/' + name;
  res.download(filepath);
};
