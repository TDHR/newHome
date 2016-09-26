// plugin
import Cookies from 'cookies-js';

// modules
import ChangeLanguage from './modules/change-language';

// 语言切换按钮
$('.btn-language').on('click', function() {
  ChangeLanguage($(this).data('language'));
});

// 从 cookie 判断用户是否已经登录
let token = Cookies.get('userToken');
if (token) {
  $('.notLogged').remove();
  $('.hasLogged').removeClass('hide');
} else {
  $('.hasLogged').remove();
  $('.notLogged').removeClass('hide');
}
