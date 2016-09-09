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
    url: '/reset',
    data: data,
    cache: false,
    beforeSend: function() {
      $('#btnSubmit').addClass('disabled');
    },
    success: function(data) {
      if (data.success) {
        $('#formHolder').addClass('hide');
        $('#successHolder').removeClass('hide');
      } else {
        Alert(data.msg);
      }
    },
    error: function() {
      Alert(Locales.reset[locale]['submit-err-1']);
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
    data.mobile = mobile;
  } else {
    Alert(Locales.reset[locale]['phone-err-1'], 5000);
    return false;
  }

  let smsCode = $('#smsCode').val();
  if (Validate.length(smsCode, 6)) {
    data.smsCode = smsCode;
  } else {
    Alert(Locales.reset[locale]['sms-err-1'], 5000);
    return false;
  }

  let password = $('#password').val();
  if (Validate.length(password, 6)) {
    data.password = password;
  } else {
    Alert(Locales.reset[locale]['pwd-err-1'], 5000);
    return false;
  }

  let confirmPassword = $('#confirmPassword').val();
  if (Validate.length(confirmPassword, 6)) {
    if (password === confirmPassword) {
      data.confirmPassword = confirmPassword;
    } else {
      Alert(Locales.reset[locale]['confirm-pwd-err-1'], 5000);
      return false;
    }
  } else {
    Alert(Locales.reset[locale]['confirm-pwd-err-2'], 5000);
    return false;
  }
  submitForm(data);
});
