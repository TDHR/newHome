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
    success: function(data) {
      if (data.success) {
        // 登录成功，跳转到 ucenter
        location.href = '/user/dashboard';
      } else {
        Alert(data.msg, 5000);
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
    } else {
      Alert(Locales.login[locale]['captcha-err-1'], 5000);
      return false;
    }
  }

  submitForm(data);
});
