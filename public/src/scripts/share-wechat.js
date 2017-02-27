// utils
import Validate from './utils/validate';

/**
 * 检查表单
 */
$('#form').on('submit', function(e) {
  e.preventDefault();
  if ($('#btnSubmit').hasClass('disabled')) {
    return false;
  }
  let data = {};
  let mobile = $('#mobile').val();
  if (Validate.mobile(mobile)) {
    data.username = mobile;
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
  // TODO: 真实情况下从接口获取
  var inviteCode = '98968c';
  setShare(inviteCode);
  $('#form').addClass('hide');
  $('.share-ready').removeClass('hide');
}


// 设置分享内容
function setShare(inviteCode) {
  // 分享到朋友圈
  wx.onMenuShareTimeline({
    title: 'Hi 朋友，壕气送你100RTSt，快来领取吧！', // 分享标题
    link: 'http://test.reitschain.com/signup?i=' + inviteCode, // 分享链接
    imgUrl: 'http://test.reitschain.com/images/share-wechat.png' // 分享图标
  });

  // 分享给朋友
  wx.onMenuShareAppMessage({
    title: 'Hi 朋友，壕气送你100RTSt，快来领取吧！', // 分享标题
    desc: '面向万亿金融市场的区块链应用-瑞资链-正在公测，1000万好礼全民开抢。', // 分享描述
    link: 'http://test.reitschain.com/signup?i=' + inviteCode, // 分享链接
    imgUrl: 'http://test.reitschain.com/images/share-wechat.png' // 分享图标
  });

  // 分享到QQ
  wx.onMenuShareQQ({
    title: 'Hi 朋友，壕气送你100RTSt，快来领取吧！', // 分享标题
    desc: '面向万亿金融市场的区块链应用-瑞资链-正在公测，1000万好礼全民开抢。', // 分享描述
    link: 'http://test.reitschain.com/signup?i=' + inviteCode, // 分享链接
    imgUrl: 'http://test.reitschain.com/images/share-wechat.png' // 分享图标
  });

  // 分享到腾讯微博
  wx.onMenuShareWeibo({
    title: 'Hi 朋友，壕气送你100RTSt，快来领取吧！', // 分享标题
    desc: '面向万亿金融市场的区块链应用-瑞资链-正在公测，1000万好礼全民开抢。', // 分享描述
    link: 'http://test.reitschain.com/signup?i=' + inviteCode, // 分享链接
    imgUrl: 'http://test.reitschain.com/images/share-wechat.png' // 分享图标
  });

  // 分享到QQ空间
  wx.onMenuShareQZone({
    title: 'Hi 朋友，壕气送你100RTSt，快来领取吧！', // 分享标题
    desc: '面向万亿金融市场的区块链应用-瑞资链-正在公测，1000万好礼全民开抢。', // 分享描述
    link: 'http://test.reitschain.com/signup?i=' + inviteCode, // 分享链接
    imgUrl: 'http://test.reitschain.com/images/share-wechat.png' // 分享图标
  });
}
