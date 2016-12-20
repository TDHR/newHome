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
 * [预览图片]
 * @param  {Object} input
 * @param {String} sort
 */
function previewImage(input, sort) {
  if (input.files && input.files[0]) {

    // 图片大小验证（小于10MB）
    if (input.files[0].size > 10000000) {
      Alert(Locales.verifyId[locale]['photo-err-1'], 5000);
      input.value = '';
      return false;
    }

    // 格式验证
    if (!Validate.image(input.files[0].name)) {
      Alert(Locales.verifyId[locale]['photo-err-1'], 5000);
      input.value = '';
      return false;
    }

    $(`#spin${sort}`).removeClass('hide');

    let reader = new FileReader();
    reader.onload = function(e) {
      $(`#preview${sort}`).removeClass('hide').attr('src', e.target.result);
      $(`#spin${sort}`).addClass('hide');
    }
    reader.readAsDataURL(input.files[0]);
  } else {
    $(`#preview${sort}`).addClass('hide').attr('src', '');
    $(`#spin${sort}`).addClass('hide');
  }
}

// 显示预览图片
$('#idPhoto1, #idPhoto2, #photo').on('change', function() {
  previewImage(this, $(this).data('sort'));
});

/**
 * 提交表单
 * @param [object] photos
 */
function submitForm(photos) {
  let data = $('#form').serializeObject();
  data.token = Cookies.get('userToken');
  data.idPhoto1 = photos.idPhoto1;
  data.idPhoto2 = photos.idPhoto2;
  data.photo = photos.photo;
  $.ajax({
    method: 'POST',
    url: '/user/verify-id',
    data: data,
    cache: false,
    success: function(res) {
      if (res.success) {
        Alert(Locales.verifyId[locale].success, 5000, 'success', function() {
          location.href = '/user/security';
        });
      } else {
        // 根据错误码输出相应的提示
        Alert(Locales.verifyId[locale]['error-code-' + res.code], 5000);
      }
    },
    error: function() {
      Alert(Locales.verifyId[locale]['submit-err-1'], 5000);
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
        Alert(Locales.verifyId[locale]['photo-err-1'], 5000);
        $('#btnSubmit').removeClass('disabled');
      }
    },
    error: function() {
      Alert(Locales.verifyId[locale]['submit-err-1'], 5000);
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

  let realName = $('#realName').val();
  if (!realName) {
    Alert(Locales.verifyId[locale]['real-name-err-1'], 5000);
    return false;
  }

  let idNum = $('#idNum').val();
  if (!Validate.length(idNum, 18)) {
    Alert(Locales.verifyId[locale]['id-num-err-1'], 5000);
    return false;
  }

  // 验证浏览器是否支持图片上传
  if (!window.FormData || typeof XMLHttpRequest === 'undefined' || typeof FileReader === "undefined") {
    Alert(Locales.verifyId[locale]['browser-tips']);
    return false;
  }

  let photo1 = $('#idPhoto1');
  if (photo1.val()) {
    photo1 = photo1[0];
    if (!Validate.image(photo1.value)) {
      Alert(Locales.verifyId[locale]['photo-err-1'], 5000);
      return false;
    }
  } else {
    Alert(Locales.verifyId[locale]['photo-err-2'], 5000);
    return false;
  }

  let photo2 = $('#idPhoto2');
  if (photo2.val()) {
    photo2 = photo2[0];
    if (!Validate.image(photo2.value)) {
      Alert(Locales.verifyId[locale]['photo-err-1'], 5000);
      return false;
    }
  } else {
    Alert(Locales.verifyId[locale]['photo-err-3'], 5000);
    return false;
  }

  let photo3 = $('#photo');
  if (photo3.val()) {
    photo3 = photo3[0];
    if (!Validate.image(photo3.value)) {
      Alert(Locales.verifyId[locale]['photo-err-1'], 5000);
      return false;
    }
  } else {
    Alert(Locales.verifyId[locale]['photo-err-4'], 5000);
    return false;
  }

  // 先上传图片
  uploadPhoto();
});
