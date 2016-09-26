// config
import Config from './config/config-now';

// locales
import Locales from './locales/locales';

// utils
import Cookies from 'cookies-js';
import Validate from './utils/validate';

// modules
import Alert from './modules/alert';

// 获取当前的语言类型
let locale = Cookies.get('REITsLocale');

// 提交表单信息
function submitForm(data) {
  $.ajax({
    method: 'POST',
    url: '/login',
    data: data,
    cache: false,
    beforeSend: function() {
      $('#btnSubmit').addClass('disabled');
    },
    success: function(res) {
      if (res.success) {
        // 登录成功，跳转到 ucenter
        location.href = '/user/dashboard';
      } else {
        // 根据错误码输出相应的提示
        Alert(Locales.login[locale]['error-code-' + res.code], 5000);

        // 调出验证码
        if (res.loginTimes >= 3) {
          getCaptcha();
          $('#captchaHolder').removeClass('hide');
        }
      }
    },
    error: function() {
      Alert(Locales.login[locale]['submit-err-1'], 5000);
    },
    complete: function() {
      $('#btnSubmit').removeClass('disabled');
    }
  });
}

// 登录按钮
$('#btnSubmit').on('click', function() {
  if ($(this).hasClass('disabled')) {
    return false;
  }
  let data = {};
  let mobile = $('#mobile').val();
  if (Validate.mobile(mobile)) {
    data.username = mobile;
  } else {
    Alert(Locales.login[locale]['phone-err-1'], 5000);
    return false;
  }

  let password = $('#password').val();
  if (Validate.length(password, 6)) {
    data.password = password;
  } else {
    Alert(Locales.login[locale]['pwd-err-1'], 5000);
    return false;
  }

  if (!$('#captchaHolder').hasClass('hide')) {
    let captcha = $('#captcha').val();
    if (Validate.length(captcha, 4)) {
      data.validateCode = captcha;
      data.token = $('#captcha').data('token');
    } else {
      Alert(Locales.login[locale]['captcha-err-1'], 5000);
      return false;
    }
  }

  submitForm(data);
});

/**
 * 获取验证码
 */
function getCaptcha() {
  $.ajax({
    method: 'GET',
    url: '/captcha',
    cache: false,
    success: function(res) {
      if (res.success) {
        $('#captcha').data('token', res.token);
        $('#captchaImg').attr('src', Config.platform + '/' + res.imageurl);
      } else {
        Alert('获取验证码失败', 5000);
      }
    },
    error: function() {
      Alert('获取验证码失败', 5000);
    }
  });
}

// 点击验证码图片，更新验证码
$('#captchaImg').on('click', function() {
  getCaptcha();
});
