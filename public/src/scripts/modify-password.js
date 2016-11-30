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

/**
 * 提交表单
 */
function submitForm() {
  let data = $('#form').serializeObject();
  data.token = Cookies.get('userToken');
  
  $.ajax({
    method: 'POST',
    url: '/user/modify-password',
    data: data,
    cache: false,
    beforeSend: function() {
      $('#btnSubmit').addClass('disabled');
    },
    success: function(res) {
      if (res.success) {
        Alert(Locales.modifyPassword[locale].success, 5000, 'success', function() {
          location.href = '/user/dashboard';
        });
      } else {
        // 根据错误码输出相应的提示
        Alert(Locales.modifyPassword[locale]['error-code-' + res.code], 5000);
      }
    },
    error: function() {
      Alert(Locales.modifyPassword[locale]['submit-err-1'], 5000);
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

  let oldPassword = $('#oldPassword').val();
  if (!Validate.length(oldPassword, 6)) {
    Alert(Locales.modifyPassword[locale]['old-pwd-err-1'], 5000);
    return false;
  }

  let newPassword = $('#newPassword').val();
  if (!Validate.length(newPassword, 6)) {
    Alert(Locales.modifyPassword[locale]['new-pwd-err-1'], 5000);
    return false;
  }

  let confirmPassword = $('#confirmPassword').val();
  if (Validate.length(confirmPassword, 6)) {
    if (newPassword !== confirmPassword) {
      Alert(Locales.modifyPassword[locale]['confirm-pwd-err-1'], 5000);
      return false;
    }
  } else {
    Alert(Locales.modifyPassword[locale]['confirm-pwd-err-2'], 5000);
    return false;
  }

  submitForm();
});