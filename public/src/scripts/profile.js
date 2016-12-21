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
    url: '/user/update-profile',
    data: data,
    cache: false,
    beforeSend: function() {
      $('#btnSubmit').addClass('disabled');
    },
    success: function(res) {
      if (res.success) {
        Alert(Locales.profile[locale].success, 5000, 'success');
      } else {
        // 根据错误码输出相应的提示
        Alert(Locales.profile[locale]['error-code-' + res.code], 5000);
        // 未登录、登录超时
        if (res.code === 2) {
          Cookies.set('userToken', undefined);
          location.href = '/login';
        }
      }
    },
    error: function() {
      Alert(Locales.profile[locale]['submit-err-1'], 5000);
    },
    complete: function() {
      $('#btnSubmit').removeClass('disabled');
    }
  });
}

/**
 * 验证表单
 */
$('#form').on('submit', function(e) {
  e.preventDefault();

  if ($('#btnSubmit').hasClass('disabled')) {
    return false;
  }

  let nickName = $('#nickName').val();
  if (!Validate.length(nickName, 1)) {
    Alert(Locales.profile[locale]['nickname-err-1'], 5000);
    return false;
  }

  submitForm();
});