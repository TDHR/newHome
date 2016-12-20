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
 * @param [object] photos
 */
function submitForm(photos) {
  let data = $('#form').serializeObject();
  data.token = Cookies.get('userToken');
  $.ajax({
    method: 'POST',
    url: '/user/verify-bank-card',
    data: data,
    cache: false,
    success: function(res) {
      if (res.success) {
        Alert(Locales.verifyBankCard[locale].success, 5000, 'success', function() {
          location.href = '/user/security';
        });
      } else {
        // 根据错误码输出相应的提示
        Alert(Locales.verifyBankCard[locale]['error-code-' + res.code], 5000);
      }
    },
    error: function() {
      Alert(Locales.verifyBankCard[locale]['submit-err-1'], 5000);
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

  let bankcardNum = $('#bankcardNum').val();
  if (!bankcardNum) {
    Alert(Locales.verifyBankCard[locale]['bank-card-err-1'], 5000);
    return false;
  }

  let name = $('#name').val();
  if (!name) {
    Alert(Locales.verifyBankCard[locale]['name-err-1'], 5000);
    return false;
  }

  let idNumber = $('#idNumber').val();
  if (!Validate.length(idNumber, 18)) {
    Alert(Locales.verifyBankCard[locale]['id-num-err-1'], 5000);
    return false;
  }

  // 提交表单
  submitForm();
});