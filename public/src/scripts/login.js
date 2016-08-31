// utils
import Validate from './utils/validate';

// modules
import Alert from './modules/alert';

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
        location.href = '/ucenter';
      } else {
        Alert(data.msg);
      }
    },
    error: function() {
      Alert('登录失败，请稍后重试');
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
    Alert('请输入手机号码', 5000);
    return false;
  }

  let password = $('#password').val();
  if (Validate.length(password, 6)) {
    data.password = password;
  } else {
    Alert('请输入密码', 5000);
    return false;
  }

  if (!$('#captchaHolder').hasClass('hide')) {
    let captcha = $('#captcha').val();
    if (Validate.length(captcha, 4)) {
      data.captcha = captcha;
    } else {
      Alert('请输入验证码', 5000);
      return false;
    }
  }

  submitForm(data);
});
