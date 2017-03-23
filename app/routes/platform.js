var login = require('./../controllers/login');
var signup = require('./../controllers/signup');
var reset = require('./../controllers/reset');
var dashboard = require('./../controllers/dashboard');
var profile = require('./../controllers/profile');
var notification = require('./../controllers/notification');
var security = require('./../controllers/security');
var phoneCode = require('./../controllers/phone-code');
var invitation = require('./../controllers/get-rewards');

module.exports = function(app, auth) {
  // 登录页面
  app.get('/login', auth.doNotNeedLogin, login.index);

  // 登录接口
  app.post('/login', login.login);

  // 获取图片验证码
  app.get('/captcha', login.captcha);

  // 登出
  app.get('/logout', login.logout);

  // 注册页面
  app.get('/signup', auth.doNotNeedLogin, signup.index);

  // 注册接口
  app.post('/signup', signup.signup);

  // 发送手机验证码
  app.post('/phone-code', phoneCode.default);

  // 忘记密码页面
  app.get('/reset', auth.doNotNeedLogin, reset.index)

  // 忘记密码接口
  app.post('/reset', reset.reset);

  // dashboard
  app.get('/user/dashboard', auth.needToLogin, dashboard.index);

  // 修改分红地址
  app.get('/user/update-dividend/:id?',  auth.needToLogin, dashboard.dividend);
  app.post('/user/update-dividend',  auth.needToLogin, dashboard.updateDividend);

  // 系统通知页面
  app.get('/notification', auth.needToLogin, notification.index);

  // 系统通知内容
  app.get('/notification/:id', auth.needToLogin, notification.detail);
  
  // 个人信息
  app.get('/user/profile', auth.needToLogin, profile.index);
  
  // 更新个人信息
  app.post('/user/update-profile', auth.needToLogin, profile.update);

  // 账户安全
  app.get('/user/security', auth.needToLogin, security.index);

  // 修改密码
  app.get('/user/change-password', auth.needToLogin, security.pwd);
  app.post('/user/change-password', auth.needToLogin, security.changePwd);

  // 修改手机
  app.get('/user/change-phone', auth.needToLogin, security.phone);
  app.post('/user/change-phone', auth.needToLogin, security.changePhone);

  // 查看实名认证信息
  app.get('/user/view-id', auth.needToLogin, security.viewId);

  // 更新实名认证信息
  app.get('/user/verify-id', auth.needToLogin, security.verifyId);
  app.post('/user/verify-id', auth.needToLogin, security.verifyIdPost);

  // 查看银行卡认证
  app.get('/user/view-bank-card', auth.needToLogin, security.viewBankCard);

  // 银行卡认证
  app.get('/user/verify-bank-card', auth.needToLogin, security.verifyBankCard);
  app.post('/user/verify-bank-card', auth.needToLogin, security.verifyBankCardPost);

  // 风险承受能力评估
  app.get('/user/risk-tolerance', auth.needToLogin, security.riskTolerance);
  app.post('/user/risk-tolerance', auth.needToLogin, security.riskTolerancePost);

  // 邀请奖励
  app.get('/user/get-rewards/:page?/:pageNum?', auth.needToLogin, invitation.index);

  // 下载
  app.get('/download/:type/:name', dashboard.download);
};
