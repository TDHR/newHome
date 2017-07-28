var signup = require('./../controllers/signup');
var phoneCode = require('./../controllers/phone-code');

module.exports = function(app, auth) {
  // 注册页面
  app.get('/signup', auth.doNotNeedLogin, signup.index);

  // 注册接口
  app.post('/signup', signup.signup);

  // 发送手机验证码
  app.post('/phone-code', phoneCode.default);

  // 获取图片验证码
  app.get('/get-image-code', signup.getImageCode);
};
