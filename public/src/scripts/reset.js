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

// 获取手机验证码
$('#btnSmsCode').on('click', function() {
  const that = $(this);
  let phoneNum = $('#phoneNum').val();
  if (!Validate.mobile(phoneNum)) {
    Alert(Locales.signup[locale]['phone-err-1'], 5000);
    return false;
  }

  if (that.hasClass('disabled')) {
    return false;
  }

  $.ajax({
    method: 'POST',
    url: 'phoneCode',
    data: {
      phoneNum: phoneNum
    },
    cache: false,
    beforeSend: function() {
      that.addClass('disabled');
      countDown();
    },
    success: function(res) {
      if (!res.success) {
        // 根据错误码输出相应的提示
        Alert(Locales.reset[locale]['phoneCode-err-' + res.code], 5000);
        // 还原「获取验证码」
        that.removeClass('disabled').html(Locales.reset[locale].phoneCode);
      }
    },
    error: function() {
      // 获取验证码失败，请稍后重试
      Alert(Locales.reset[locale]['phoneCode-err-1'], 5000);
      // 还原「获取验证码」
      that.removeClass('disabled').html(Locales.reset[locale].phoneCode);
    }
  });
});

// 获取验证码处的倒计时
function countDown() {
  let time = 60;
  const count = () => {
    time--;
    if (time) {
      // 再次获取（60s）
      $('#btnSmsCode').html(`${Locales.reset[locale]['phoneCode-count']}(${time}s)`);
      window.phoneCodeTimeout = setTimeout(() => {
        count();
      }, 1000);
    } else {
      clearTimeout(window.phoneCodeTimeout);
      // 还原「获取验证码」
      $('#btnSmsCode').removeClass('disabled').html(Locales.reset[locale].phoneCode);
    }
  };
  count();
}

/**
 * 提交表单
 */
function submitForm() {
  $.ajax({
    method: 'POST',
    url: '/reset',
    data: $('#form').serializeObject(),
    cache: false,
    beforeSend: function() {
      $('#btnSubmit').addClass('disabled');
    },
    success: function(res) {
      if (res.success) {
        $('#formHolder').addClass('hide');
        $('#successHolder').removeClass('hide');
      } else {
        // 根据错误码输出相应的提示
        Alert(Locales.reset[locale]['error-code-' + res.code], 5000);
      }
    },
    error: function() {
      Alert(Locales.reset[locale]['submit-err-1'], 5000);
    },
    complete: function() {
      $('#btnSubmit').removeClass('disabled');
    }
  });
}

// 重置按钮
$('#btnSubmit').on('click', function() {
  if ($(this).hasClass('disabled')) {
    return false;
  }

  let phoneNum = $('#phoneNum').val();
  if (!Validate.mobile(phoneNum)) {
    Alert(Locales.signup[locale]['phone-err-1'], 5000);
    return false;
  }

  let phoneValidCode = $('#phoneValidCode').val();
  if (!Validate.length(phoneValidCode, 6)) {
    Alert(Locales.signup[locale]['sms-err-1'], 5000);
    return false;
  }

  let password = $('#password').val();
  if (!Validate.length(password, 6)) {
    Alert(Locales.signup[locale]['pwd-err-1'], 5000);
    return false;
  }

  let confirmPassword = $('#confirmPassword').val();
  if (Validate.length(confirmPassword, 6)) {
    if (password !== confirmPassword) {
      Alert(Locales.signup[locale]['confirm-pwd-err-1'], 5000);
      return false;
    }
  } else {
    Alert(Locales.signup[locale]['confirm-pwd-err-2'], 5000);
    return false;
  }

  submitForm();
});

