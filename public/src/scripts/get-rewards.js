// locales
import Locales from './locales/locales';

// utils
import Cookies from 'cookies-js';

// modules
import Alert from './modules/alert';

// 获取当前的语言类型
let locale = Cookies.get('REITsLocale');

// 交易列表的分页
$('.pagination-holder').bootpag({
  total: $('#paginationHolder').data('total'),
  page: $('#paginationHolder').data('current'),
  maxVisible: 5,
  leaps: true,
  hrefVariable: '[number]',
  href: location.pathname.split('/page')[0] + '/page/[number]',
  wrapClass: 'pagination',
  activeClass: 'active',
  disabledClass: 'disabled'
});

// 复制到剪接版
let clipboard = new Clipboard('#copyBtn');
clipboard.on('success', function(e) {
  Alert(Locales.getRewards[locale]['copy-success'], 5000, 'success');
});
clipboard.on('error', function(e) {
  Alert(Locales.getRewards[locale]['copy-failed'], 5000,);
});
