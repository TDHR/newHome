// utils
import Validate from './utils/validate';

// modules
import Alert from './modules/alert';

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
    Alert('请输入正确的手机号码', 5000);
    return false;
  }

  let smsCode = $('#smsCode').val();
  if (Validate.length(smsCode, 6)) {
    data.smsCode = smsCode;
  } else {
    Alert('请输入短信验证码', 5000);
    return false;
  }

  let password = $('#password').val();
  if (Validate.length(password, 6)) {
    data.password = password;
  } else {
    Alert('请输入不小于6位的密码', 5000);
    return false;
  }

  let confirmPassword = $('#confirmPassword').val();
  if (Validate.length(confirmPassword, 6)) {
    if (password === confirmPassword) {
      data.confirmPassword = confirmPassword;
    } else {
      Alert('两次密码不一致', 5000);
      return false;
    }
  } else {
    Alert('请输入不小于6位的确认密码', 5000);
    return false;
  }
  submitForm(data);
});
