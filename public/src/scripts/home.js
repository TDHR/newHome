

// 打开微信二维码
$('#wechat').on('click', function() {
  $('.wechat-qrcode').removeClass('hide');
});

// 关闭微信二维码
$('.wechat-close').on('click', function() {
  $('.wechat-qrcode').addClass('hide');
});

$(document).ready(function() {
  $('.header-logo').addClass('header-logo-ready');
});

//点击获取验证码
$('#getCode').click(function () {
  var username = $('#telNum').val();
  $.ajax({
    method:'GET',
    url: '/site/getCode',
    cache: false,
    data: {
      username: username
    },
    beforeSend: function () {
      $(this).addClass('disabled');
    },
    success: function (res) {
      if(res.success){
        alert(res.message);
      }else{
        alert(res.message);
      }
    }
  })
});



// 点击登录
$('#login').click(function () {
  var username = $('#telNum').val();
  var telCode = $('#telCode').val();
  var psw = $('#psw').val();

  if(!username){
    alert('请输入手机号');
    return;
  }
  if(!psw){
    alert('请输入密码');
    return;
  }
  if(!telCode){
    alert('请输入验证码');
    return;
  }
  $.ajax({
    method: 'GET',
    url: '/site/doLogin',
    cache: false,
    data: {
      username: username,
      psw: psw,
      telCode: telCode
    },
    beforeSend: function () {
      $(this).addClass('disabled');
    },
    success: function (res) {
      if(res.success){
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("realName", res.realName);
        location.href = '/site/collection';
      }else {
        alert(res.message);
      }
    },
    complete: function () {
      $(this).removeClass('disabled');
    }
  })
});
// 点击提交银行卡信息
$('#submit').click(function () {
  var bankCardNum = $('#bankCardNum').val();
  var openBankName = $('#openBankName').val();
  var openBankAddress = $('#openBankAddress').val();
  var token = sessionStorage.getItem('token');
  if(!bankCardNum){
    alert('请输入银行卡号');
    return;
  }
  if(!openBankName){
    alert('请输入开户行');
    return;
  }
  if(!openBankAddress){
    alert('请输入开户行详细地址');
    return;
  }
  $.ajax({
    method: 'GET',
    url: '/site/subBankMessage',
    cache: false,
    data:{
      token: token,
      bankCardNum: bankCardNum,
      openBankName: openBankName,
      bankAddress:openBankAddress
    },
    beforeSend: function () {
      $(this).addClass('disabled');
    },
    success: function (res) {
      if(res.success){
        alert(res.message);
        location.href = '/';
      }else{
        alert(res.message);
      }
    },
    complete: function () {
      $(this).removeClass('disabled')
    }
  })
});

$('#userName').val(sessionStorage.getItem('realName'));
