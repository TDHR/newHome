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
        Alert(res.msg, 5000);
      }
    },
    error: function() {
      Alert(Locales.signup[locale]['submit-err-1'], 5000);
    },
    complete: function() {
      $('#btnSubmit').removeClass('disabled');
    }
  });
}

// 「下一步」按钮
$('#btnNext').on('click', function() {
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
    Alert(Locales.signup[locale]['real-name-err-1'], 5000);
    return false;
  }

  let idNum = $('#idNum').val();
  if (!Validate.length(idNum, 18)) {
    Alert(Locales.signup[locale]['id-num-err-1'], 5000);
    return false;
  }

  // 验证浏览器是否支持图片上传
  if (!window.FormData || typeof XMLHttpRequest === 'undefined' || typeof FileReader === "undefined") {
    Alert(Locales.signup[locale]['browser-tips']);
    return false;
  }

  let photo1 = $('#idPhoto1');
  if (photo1.val()) {
    photo1 = photo1[0];
    if (!Validate.image(photo1.value)) {
      Alert(Locales.signup[locale]['photo-err-1'], 5000);
      return false;
    }
  } else {
    Alert(Locales.signup[locale]['photo-err-2'], 5000);
    return false;
  }

  let photo2 = $('#idPhoto2');
  if (photo2.val()) {
    photo2 = photo2[0];
    if (!Validate.image(photo2.value)) {
      Alert(Locales.signup[locale]['photo-err-1'], 5000);
      return false;
    }
  } else {
    Alert(Locales.signup[locale]['photo-err-3'], 5000);
    return false;
  }

  let photo3 = $('#photo');
  if (photo3.val()) {
    photo3 = photo3[0];
    if (!Validate.image(photo3.value)) {
      Alert(Locales.signup[locale]['photo-err-1'], 5000);
      return false;
    }
  } else {
    Alert(Locales.signup[locale]['photo-err-4'], 5000);
    return false;
  }

  let terms = $('#terms:checked').val();
  if (!terms) {
    Alert(Locales.signup[locale]['terms-err-1'], 5000);
    return false;
  }

  submitForm();
});
