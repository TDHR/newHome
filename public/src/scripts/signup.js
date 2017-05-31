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

$(document).ready(function() {
  getImageCode();
});

// 获取手机验证码
$('#btnSmsCode').on('click', function() {
  const that = $(this);
  let phoneNum = $('#phoneNum').val();
  if (!Validate.mobile(phoneNum)) {
    Alert(Locales.signup[locale]['phone-err-1'], 5000);
    return false;
  }

  let imageCode = $('#imageCode').val();
  if (!imageCode) {
    Alert('请先输入图片验证码', 5000);
    return false;
  }

  if (that.hasClass('disabled')) {
    return false;
  }

  $.ajax({
    method: 'POST',
    url: '/phone-code',
    data: {
      phoneNum: phoneNum,
      smsType: 1,
      type: 1,
      imageCode: imageCode,
      key: $('#key').val()
    },
    cache: false,
    beforeSend: function() {
      that.addClass('disabled');
      countDown();
    },
    success: function(res) {
      if (!res.success) {
        // 根据错误码输出相应的提示
        Alert(res.msg, 5000);
        // 还原「获取验证码」
        that.removeClass('disabled').html(Locales.signup[locale].phoneCode);
      }
    },
    error: function() {
      Alert('获取验证码失败，请稍后重试', 5000);
      // 还原「获取验证码」
      that.removeClass('disabled').html(Locales.signup[locale].phoneCode);
    },
    complete: function() {
      clearTimeout(window.phoneCodeTimeout);
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
      $('#btnSmsCode').html(`${Locales.signup[locale]['phoneCode-count']}(${time}s)`);
      window.phoneCodeTimeout = setTimeout(() => {
        count();
      }, 1000);
    } else {
      clearTimeout(window.phoneCodeTimeout);
      // 还原「获取验证码」
      $('#btnSmsCode').removeClass('disabled').html(Locales.signup[locale].phoneCode);
    }
  };
  count();
}

/**
 * [提交表单]
 */
function submitForm() {
  // 倒计时跳转
  var jump = (sec) => {
    clearTimeout(window.jumpCountdown);
    sec--;
    if (sec) {
      $('#jumpCountdown').text(sec);
      window.jumpCountdown = setTimeout(() => {
        jump(sec);
      }, 1000);
    } else {
      location.href = '/beta/intro#download';
    }
  };

  $.ajax({
    method: 'POST',
    url: '/signup',
    data: $('#form').serializeObject(),
    cache: false,
    success: function(res) {
      if (res.success) {
        $('#formHolder').addClass('hide');
        $('#successHolder').removeClass('hide');
        jump(5);
      } else {
        if (res.code === 19) {
          Alert('请输入图片验证码', 5000);
          $('#key').val(res.data.key);
          $('#imageCodeSrc').attr('src', 'data:image/jpeg;base64,' + res.data.image);
        } else {
          // 根据错误码输出相应的提示
          Alert(res.msg, 5000);
        }
      }
    },
    error: function() {
      Alert(res.msg, 5000);
    },
    complete: function() {
      $('#btnSubmit').removeClass('disabled');
    }
  });
}

// 获取图片验证码
function getImageCode() {
  $.ajax({
    method: 'GET',
    url: '/get-image-code',
    cache: false,
    success: function(res) {
      if (res.code === 0) {
        $('#key').val(res.data.key);
        $('#imageCodeSrc').attr('src', 'data:image/jpeg;base64,' + res.data.image);
      } else {
        // 根据错误码输出相应的提示
        Alert(Locales.signup[locale]['error-code-' + res.code], 5000);
      }
    },
    error: function() {
      Alert('获取图片验证码失败', 5000);
    }
  });
}

$('#imageCodeSrc').on('click', function() {
  getImageCode();
});

// 检查表单
$('#form').on('submit', function(e) {
  e.preventDefault();

  if ($('#btnSubmit').hasClass('disabled')) {
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

  if (!$('#imageCode').val()) {
    Alert('请输入图片验证码', 5000);
    return false;
  }

  let terms = $('#terms:checked').val();
  if (!terms) {
    Alert(Locales.signup[locale]['terms-err-1'], 5000);
    return false;
  }

  submitForm();
});
