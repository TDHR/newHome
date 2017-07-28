// utils
import Validate from './utils/validate';

/**
 * fullpage
 */
$("#page").fullpage({
  responsiveWidth: 319
});


/**
 * 检查表单
 */
$('#form').on('submit', function(e) {
  e.preventDefault();
  if ($('#btnSubmit').hasClass('disabled')) {
    return false;
  }
  let data = {};
  let phoneNum = $('#phoneNum').val();
  if (Validate.mobile(phoneNum)) {
    data.phoneNum = phoneNum;
  } else {
    alert('请输入正确的手机号码');
    return false;
  }
  submitForm(data);
});

/**
 * 提交表单
 */
function submitForm(data) {
  $.ajax({
    method: 'POST',
    url: '/share/get-invite-code',
    data: data,
    cache: false,
    beforeSend: function() {
      $('#btnSubmit').addClass('disabled');
    },
    success: function(res) {
      if (res.success) {
        setShare(res.data.inviteCode);
        $('#form').addClass('hide');
        $('.share-ready').removeClass('hide');
      } else {
        alert(res.msg);
      }
    },
    error: function() {
      alert('生成失败，请稍后重试');
    },
    complete: function() {
      $('#btnSubmit').removeClass('disabled');
    }
  });
}


// 设置分享内容
function setShare(inviteCode) {
  var url = $('#env').val();

  // 分享到朋友圈
  wx.onMenuShareTimeline({
    title: 'Hi 朋友，壕气送你100RTSt，快来领取吧！', // 分享标题
    link: `${url}/signup?i=${inviteCode}`, // 分享链接
    imgUrl: `${url}/images/share-wechat.png` // 分享图标
  });

  // 分享给朋友
  wx.onMenuShareAppMessage({
    title: 'Hi 朋友，壕气送你100RTSt，快来领取吧！', // 分享标题
    desc: '面向万亿金融市场的区块链应用-瑞资链-正在公测，1000万好礼全民开抢。', // 分享描述
    link: `${url}/signup?i=${inviteCode}`, // 分享链接
    imgUrl: `${url}/images/share-wechat.png` // 分享图标
  });

  // 分享到QQ
  wx.onMenuShareQQ({
    title: 'Hi 朋友，壕气送你100RTSt，快来领取吧！', // 分享标题
    desc: '面向万亿金融市场的区块链应用-瑞资链-正在公测，1000万好礼全民开抢。', // 分享描述
    link: `${url}/signup?i=${inviteCode}`, // 分享链接
    imgUrl: `${url}/images/share-wechat.png` // 分享图标
  });

  // 分享到腾讯微博
  wx.onMenuShareWeibo({
    title: 'Hi 朋友，壕气送你100RTSt，快来领取吧！', // 分享标题
    desc: '面向万亿金融市场的区块链应用-瑞资链-正在公测，1000万好礼全民开抢。', // 分享描述
    link: `${url}/signup?i=${inviteCode}`, // 分享链接
    imgUrl: `${url}/images/share-wechat.png` // 分享图标
  });

  // 分享到QQ空间
  wx.onMenuShareQZone({
    title: 'Hi 朋友，壕气送你100RTSt，快来领取吧！', // 分享标题
    desc: '面向万亿金融市场的区块链应用-瑞资链-正在公测，1000万好礼全民开抢。', // 分享描述
    link: `${url}/signup?i=${inviteCode}`, // 分享链接
    imgUrl: `${url}/images/share-wechat.png` // 分享图标
  });
}
