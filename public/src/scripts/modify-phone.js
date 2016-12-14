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
  let phoneNumber = $('#phoneNumber').val();
  if (!Validate.mobile(phoneNumber)) {
    Alert(Locales.dividend[locale]['phoneCode-err-1'], 5000);
    return false;
  }

  if (that.hasClass('disabled')) {
    return false;
  }

  $.ajax({
    method: 'POST',
    url: '/phone-code',
    data: {
      phoneNum: phoneNumber
    },
    cache: false,
    beforeSend: function() {
      that.addClass('disabled');
      countDown();
    },
    success: function(res) {
      if (!res.success) {
        // 根据错误码输出相应的提示
        Alert(Locales.modifyPhone[locale]['phoneCode-err-' + res.code], 5000);
        // 还原「获取验证码」
        that.removeClass('disabled').html(Locales.modifyPhone[locale].phoneCode);
      }
    },
    error: function() {
      // 获取验证码失败，请稍后重试
      Alert(Locales.modifyPhone[locale]['phoneCode-err-1'], 5000);
      // 还原「获取验证码」
      that.removeClass('disabled').html(Locales.modifyPhone[locale].phoneCode);
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
      $('#btnSmsCode').html(`${Locales.modifyPhone[locale]['phoneCode-count']}(${time}s)`);
      window.phoneCodeTimeout = setTimeout(() => {
        count();
      }, 1000);
    } else {
      clearTimeout(window.phoneCodeTimeout);
      // 还原「获取验证码」
      $('#btnSmsCode').removeClass('disabled').html(Locales.modifyPhone[locale].phoneCode);
    }
  };
  count();
}

/**
 * 提交表单
 */
function submitForm() {
  let data = $('#form').serializeObject();
  data.token = Cookies.get('userToken');
  
  $.ajax({
    method: 'POST',
    url: '/user/modify-phone',
    data: data,
    cache: false,
    beforeSend: function() {
      $('#btnSubmit').addClass('disabled');
    },
    success: function(res) {
      if (res.success) {
        Alert(Locales.modifyPhone[locale].success, 5000, 'success', function() {
          location.href = '/user/security';
        });
      } else {
        // 根据错误码输出相应的提示
        Alert(Locales.modifyPhone[locale]['error-code-' + res.code], 5000);
      }
    },
    error: function() {
      Alert(Locales.modifyPhone[locale]['submit-err-1'], 5000);
    },
    complete: function() {
      $('#btnSubmit').removeClass('disabled');
    }
  });
}

// 验证表单
$('#btnSubmit').on('click', function() {
  if ($(this).hasClass('disabled')) {
    return false;
  }

  let phoneNumber = $('#phoneNumber').val();
  if (!Validate.mobile(phoneNumber)) {
    Alert(Locales.modifyPhone[locale]['phone-err-1'], 5000);
    return false;
  }

  let phoneValidCode = $('#phoneValidCode').val();
  if (!Validate.length(phoneValidCode, 6)) {
    Alert(Locales.modifyPhone[locale]['sms-err-1'], 5000);
    return false;
  }

  let password = $('#password').val();
  if (!Validate.length(password, 6)) {
    Alert(Locales.modifyPhone[locale]['pwd-err-1'], 5000);
    return false;
  }

  submitForm();
});