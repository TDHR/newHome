// utils
import Validate from './utils/validate';

// modules
import Alert from './modules/alert';

// 提交表单信息
function submitForm(data) {
  $.ajax({
    method: 'POST',
    url: '/signup',
    data: new FormData($('#form')[0]),
    cache: false,
    contentType: 'multipart/form-data',
    processData: false,
    beforeSend: function() {
      $('#btnSubmit').addClass('disabled');
    },
    success: function(res) {
      if (res.success) {
        $('#formHolder').addClass('hide');
        $('#successHolder').removeClass('hide');
      } else {
        Alert(res.msg);
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

// 「下一步」按钮
$('#btnNext').on('click', function() {
  let mobile = $('#mobile').val();
  if (!Validate.mobile(mobile)) {
    Alert('请输入正确的手机号码', 5000);
    return false;
  }

  let smsCode = $('#smsCode').val();
  if (!Validate.length(smsCode, 6)) {
    Alert('请输入短信验证码', 5000);
    return false;
  }

  let password = $('#password').val();
  if (!Validate.length(password, 6)) {
    Alert('请输入不小于6位的密码', 5000);
    return false;
  }

  let confirmPassword = $('#confirmPassword').val();
  if (Validate.length(confirmPassword, 6)) {
    if (password !== confirmPassword) {
      Alert('两次密码不一致', 5000);
      return false;
    }
  } else {
    Alert('请输入不小于6位的确认密码', 5000);
    return false;
  }

  // 显示第二步
  $('#step1').addClass('hide');
  $('#stepTitle1').removeClass('active');
  $('#step2').removeClass('hide');
  $('#stepTitle2').addClass('active');
});

// 登录按钮
$('#btnSubmit').on('click', function() {
  if ($(this).hasClass('disabled')) {
    return false;
  }

  let realName = $('#realName').val();
  if (!realName) {
    Alert('请输入真实姓名', 5000);
    return false;
  }

  let idNum = $('#idNum').val();
  if (!Validate.length(idNum, 18)) {
    Alert('请输入正确的身份证号码', 5000);
    return false;
  }

  // 验证浏览器是否支持图片上传
  if (!window.FormData || typeof XMLHttpRequest === 'undefined' || typeof FileReader === "undefined") {
    Alert('你的浏览器太古老了，请使用更现代的浏览器访问本网站');
    return false;
  }

  let photo1 = $('#photo1');
  if (photo1.val()) {
    photo1 = photo1[0];
    if (!Validate.image(photo1.value)) {
      Alert('仅支持JPG、GIF、PNG、JPEG，文件小于5M', 5000);
      return false;
    }
  } else {
    Alert('请选择身份证正面照片', 5000);
    return false;
  }

  let photo2 = $('#photo2');
  if (photo2.val()) {
    photo2 = photo2[0];
    if (!Validate.image(photo2.value)) {
      Alert('仅支持JPG、GIF、PNG、JPEG，文件小于5M', 5000);
      return false;
    }
  } else {
    Alert('请选择身份证反面照片', 5000);
    return false;
  }

  let photo3 = $('#photo3');
  if (photo3.val()) {
    photo3 = photo3[0];
    if (!Validate.image(photo3.value)) {
      Alert('仅支持JPG、GIF、PNG、JPEG，文件小于5M', 5000);
      return false;
    }
  } else {
    Alert('请选择正面半身照', 5000);
    return false;
  }

  let terms = $('#terms:checked').val();
  if (!terms) {
    Alert('阅读并同意瑞资的服务条款后，才能完成注册', 5000);
    return false;
  }

  submitForm();
});
