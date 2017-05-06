// plugin
import Cookies from 'cookies-js';

// 从 cookie 判断用户是否已经登录
let token = Cookies.get('userToken');
if (token) {
  $('.notLogged').remove();
  $('.hasLogged').removeClass('hide');
} else {
  $('.hasLogged').remove();
  $('.notLogged').removeClass('hide');
}
