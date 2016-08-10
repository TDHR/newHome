// modules
import ChangeLanguage from './modules/change-language';

// 语言切换按钮
$('.btn-language').on('click', function() {
  ChangeLanguage($(this).data('language'));
});
