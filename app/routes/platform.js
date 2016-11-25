var login = require('./../controllers/login');
var signup = require('./../controllers/signup');
var reset = require('./../controllers/reset');
var dashboard = require('./../controllers/dashboard');
var info = require('./../controllers/info');
var notification = require('./../controllers/notification');
var security = require('./../controllers/security');
var phoneCode = require('./../controllers/phone-code');

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
  app.post('/phoneCode', phoneCode.default);

  // 忘记密码页面
  app.get('/reset', auth.doNotNeedLogin, reset.index)

  // 忘记密码接口
  app.post('/reset', reset.reset);

  // dashboard
  app.get('/user/dashboard', auth.needToLogin, dashboard.index);

  // 钱包详情页面
  app.get('/wallet/:wid',  auth.needToLogin, dashboard.wallet);

  // 绑定钱包页面
  app.get('/user/bind-wallet',  auth.needToLogin, dashboard.bindWallet);

  // 修改分红地址
  app.get('/user/update-dividend',  auth.needToLogin, dashboard.dividend);
  app.post('/user/update-dividend',  auth.needToLogin, dashboard.updateDividend);

  // 系统通知页面
  app.get('/notification', auth.needToLogin, notification.index);

  // 系统通知内容
  app.get('/notification/:id', auth.needToLogin, notification.detail);
  
  // 个人信息
  app.get('/user/info', auth.needToLogin, info.index);
  
  // 更新个人信息
  app.post('/user/update-info', auth.needToLogin, info.update);

  // 账户安全
  app.get('/user/security', auth.needToLogin, security.index);

  // 修改密码
  app.get('/user/modify-password', auth.needToLogin, security.pwd);
  app.post('/user/modify-password', auth.needToLogin, security.modifyPwd);

  // 修改手机
  app.get('/user/modify-phone', auth.needToLogin, security.phone);
  app.post('/user/modify-phone', auth.needToLogin, security.modifyPhone);

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
};
