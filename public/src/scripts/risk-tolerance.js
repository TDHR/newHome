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
function submitForm(score, type) {
  $.ajax({
    method: 'POST',
    url: '/user/risk-tolerance',
    data: {
      token: Cookies.get('userToken'),
      score: score,
      type: type
    },
    cache: false,
    beforeSend: function() {
      $('#btnSubmit').addClass('disabled');
    },
    success: function(res) {
      if (res.success) {
        Alert(Locales.riskTolerance[locale].success, 5000, 'success', function() {
          location.href = '/user/security';
        });
      } else {
        // 根据错误码输出相应的提示
        Alert(Locales.riskTolerance[locale]['error-code-' + res.code], 5000);
      }
    },
    error: function() {
      Alert(Locales.riskTolerance[locale]['submit-err-1'], 5000);
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

  var score = 0;
  var type = 0;
  var val = '';

  for (var i = 1; i <= 12; i++) {
    val = $('input[name=q' + i + ']:checked').val();
    if (val) {
      score += (+val); 
    } else {
      Alert(Locales.riskTolerance[locale]['q-err-1'], 5000);
      $('input[name=q' + i + ']').focus();
      return false;
    }
  }

  if (score <= 360) {
    type = 0; // 保守型
  } else if (score > 360 && score <= 720) {
    type = 1; // 稳健型
  } else {
    type = 2; // 积极型
  }

  submitForm(score, type);
});