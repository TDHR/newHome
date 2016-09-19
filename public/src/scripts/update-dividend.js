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
  let phoneNum = $('#phoneValidCode').data('phonenum');
  if (!Validate.mobile(phoneNum)) {
    Alert(Locales.dividend[locale]['phoneCode-err-1'], 5000);
    return false;
  }

  if (that.hasClass('disabled')) {
    return false;
  }

  $.ajax({
    method: 'POST',
    url: '/phoneCode',
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
        Alert(Locales.dividend[locale]['phoneCode-err-' + res.code], 5000);
        // 还原「获取验证码」
        that.removeClass('disabled').html(Locales.dividend[locale].phoneCode);
      }
    },
    error: function() {
      // 获取验证码失败，请稍后重试
      Alert(Locales.dividend[locale]['phoneCode-err-1'], 5000);
      // 还原「获取验证码」
      that.removeClass('disabled').html(Locales.dividend[locale].phoneCode);
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
      $('#btnSmsCode').html(`${Locales.dividend[locale]['phoneCode-count']}(${time}s)`);
      window.phoneCodeTimeout = setTimeout(() => {
        count();
      }, 1000);
    } else {
      clearTimeout(window.phoneCodeTimeout);
      // 还原「获取验证码」
      $('#btnSmsCode').removeClass('disabled').html(Locales.dividend[locale].phoneCode);
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
  data.phoneNum = $('#phoneValidCode').data('phonenum');

  $.ajax({
    method: 'POST',
    url: '/user/update-dividend',
    data: data,
    cache: false,
    beforeSend: function() {
      $('#btnSubmit').addClass('disabled');
    },
    success: function(res) {
      if (res.success) {
        Alert(Locales.dividend[locale].success, 5000, 'success');
      } else {
        // 根据错误码输出相应的提示
        Alert(Locales.dividend[locale]['error-code-' + res.code], 5000);
      }
    },
    error: function() {
      Alert(Locales.dividend[locale]['submit-err-1'], 5000);
    },
    complete: function() {
      $('#btnSubmit').removeClass('disabled');
    }
  });
}

// 提交按钮
$('#btnSubmit').on('click', function() {
  if ($(this).hasClass('disabled')) {
    return false;
  }

  let address = $('#address').val();
  if (!Validate.length(address, 26)) {
    Alert(Locales.dividend[locale]['address-err-1'], 5000);
    return false;
  }

  let phoneValidCode = $('#phoneValidCode').val();
  if (!Validate.length(phoneValidCode, 6)) {
    Alert(Locales.dividend[locale]['sms-err-1'], 5000);
    return false;
  }

  submitForm();
});