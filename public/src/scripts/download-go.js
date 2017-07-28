$('document').ready(function () {
  var a = $('.a').val();
  if(isWeiXin()){
    window.location.href = a
  }else {

  }
});
function isWeiXin(){
  var ua = window.navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i) === 'micromessenger'){
    return true;
  }else{
    return false;
  }
}
