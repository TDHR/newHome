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
  let data = {};
  data.token = Cookies.get('userToken');
  data.idPhoto1 = photos.idPhoto1;
  data.idPhoto2 = photos.idPhoto2;
  data.photo = photos.photo;
  $.ajax({
    method: 'POST',
    url: '/user/update-verification',
    data: data,
    cache: false,
    success: function(res) {
      if (res.success) {
        Alert(Locales.security[locale]['success'], 5000, 'success');
      } else {
        // 根据错误码输出相应的提示
        Alert(Locales.security[locale]['photo-error-code-' + res.code], 5000);
      }
    },
    error: function() {
      Alert(Locales.security[locale]['submit-err-1'], 5000);
    },
    complete: function() {
      $('#btnSubmit').removeClass('disabled');
    }
  });
}


/**
 * 上传图片
 */
function uploadPhoto() {
  let formData = new FormData();
  formData.append('idPhoto1', $('#idPhoto1')[0].files[0]);
  formData.append('idPhoto2', $('#idPhoto2')[0].files[0]);
  formData.append('photo', $('#photo')[0].files[0]);

  $.ajax({
    method: 'POST',
    url: `${Config.platform}/api/vipuser/uploadimage`,
    data: formData,
    cache: false,
    dataType: 'json',
    contentType: false,
    processData: false,
    beforeSend: function() {
      $('#btnSubmit').addClass('disabled');
    },
    success: function(res) {
      if (res.success) {
        submitForm(res);
      } else {
        // 根据相应的错误码进行提示
        Alert(Locales.security[locale]['photo-err-1'], 5000);
        $('#btnSubmit').removeClass('disabled');
      }
    },
    error: function() {
      Alert(Locales.security[locale]['submit-err-1'], 5000);
      $('#btnSubmit').removeClass('disabled');
    }
  });
}

// 保存按钮
$('#btnSubmit').on('click', function() {
  if ($(this).hasClass('disabled')) {
    return false;
  }

  // 验证浏览器是否支持图片上传
  if (!window.FormData || typeof XMLHttpRequest === 'undefined' || typeof FileReader === "undefined") {
    Alert(Locales.security[locale]['browser-tips']);
    return false;
  }

  let photo1 = $('#idPhoto1');
  if (photo1.val()) {
    photo1 = photo1[0];
    if (!Validate.image(photo1.value)) {
      Alert(Locales.security[locale]['photo-err-1'], 5000);
      return false;
    }
  } else {
    Alert(Locales.security[locale]['photo-err-2'], 5000);
    return false;
  }

  let photo2 = $('#idPhoto2');
  if (photo2.val()) {
    photo2 = photo2[0];
    if (!Validate.image(photo2.value)) {
      Alert(Locales.security[locale]['photo-err-1'], 5000);
      return false;
    }
  } else {
    Alert(Locales.security[locale]['photo-err-3'], 5000);
    return false;
  }

  let photo3 = $('#photo');
  if (photo3.val()) {
    photo3 = photo3[0];
    if (!Validate.image(photo3.value)) {
      Alert(Locales.security[locale]['photo-err-1'], 5000);
      return false;
    }
  } else {
    Alert(Locales.security[locale]['photo-err-4'], 5000);
    return false;
  }

  // 先上传图片
  uploadPhoto();
});