var request = require('superagent');
var config = require('../../config/config');

// 首页
exports.index = function(req, res) {
  res.render('site/home', {
    nav: 'home'
  });
};

// 核心价值
exports.values = function(req, res) {
  res.render('site/values', {
    nav: 'values'
  });
};

// 服务
exports.service = function(req, res) {
  res.render('site/service', {
    nav: 'service'
  });
};

// 团队
exports.team = function(req, res) {
  res.render('site/team', {
    nav: 'team'
  });
};

// 知识库
exports.knowledge = function(req, res) {
  res.render('site/knowledge', {
    nav: 'knowledge'
  });
};

// 联系我们
exports.contact = function(req, res) {
  res.render('site/contact', {
    nav: 'contact'
  });
};

// 服务条款
exports.terms = function(req, res) {
  res.render('site/terms', {
    nav: 'terms'
  });
};

// 获取文章
exports.articles = function(req, res) {
  var page = req.query.page || 1;
  var limit = req.query.limit || 4;
  request
    .get(config.weixin + '/ArticleOut/GetList')
    .query({
      language: res.getLocale() || 'zh',
      page: page,
      limit: limit
    })
    .end(function(err, result) {
      var articleData = '';
      if (result && result.body.success) {
        return res.json({
          success: true,
          data: result.body.data
        });
      } else {
        return res.json({
          success: false
        });
      }
    });
};

// 文章内容
exports.article = function(req, res) {
  request
    .get(config.weixin + '/ArticleOut/GetDetail')
    .query({
      language: res.getLocale() || 'zh',
      id: req.params.articleID
    })
    .end(function(err, result) {
      var data = '';
      if (result && result.body.success) {
        data = result.body.data;
      }
      res.render('site/article', {
        nav: 'knowledge',
        data: data
      });
    });
};

// 关于 POS
exports.helpPos = function(req, res) {
  res.render('site/help-pos', {
    nav: ''
  });
};

// 帮助-介绍运作机制
exports.helpIntro = function(req, res) {
  res.render('site/help-intro', {
    layout: ''
  });
};

// 公测-微信分享页面
exports.shareWeChat = function(req, res) {
  var appid = 'wx51e4d7e2e0a6cbf1';
  var secret = '57d229ddd7c99ed0032c0cab99425134';

  // {
  //   "RootUrl": "http://app.reitschain.com/",
  //   "Url": "http://app.reitschain.com/WxInput",
  //   "Appid": "wx51e4d7e2e0a6cbf1",
  //   "Secret": "57d229ddd7c99ed0032c0cab99425134",
  //   "Token": "ruizi_weixin_new",
  //   "EncodingAESKey": "p4Qr3PwpsjZfYlXSWdVL9R27AYNTpKpvOx57Z7Iiu2z"
  // }


  res.render('site/share-wechat', {
    layout: ''
  })
};

