var site = require('./../controllers/site');
var wechatJssdk = require('../../config/wechat-jssdk');

module.exports = function(app, auth) {
  // 首页
  app.get('/', site.index);

  // 服务条款
  app.get('/terms', site.terms);

  // 关于 POS
  app.get('/help/pos', site.helpPos);

  // 公测-微信分享页面
  // app.get('/share/wechat', wechatJssdk.getJssdkConfigByAjax, site.shareWeChat);
  // app.post('/share/get-invite-code', site.getInviteCode);
  // app.get('/share/wechat', site.betaIntro);

  // 公测介绍页
  // app.get('/beta/intro', site.betaIntro);

  // 下载钱包
  app.get('/downloads', site.downloads);

  // 下载
  app.get('/download/:type/:name', site.download);

  // ico
  app.get('/ico', site.ico);

  // 下载中转页
  app.get('/downloadgo', site.go);
  // 跳转到登陆页面
  app.get('/goLogin', site.goLogin);
  // 获取验证码
  app.get('/site/getCode', site.getCode);
  // 登录
  app.get('/site/doLogin', site.doLogin);
  //跳转到收集页面
  app.get('/site/collection', site.collection);
  //提交银行卡信息
  app.get('/site/subBankMessage', site.subBankMessage);
};
