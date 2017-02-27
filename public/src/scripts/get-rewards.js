// locales
import Locales from './locales/locales';

// utils
import Cookies from 'cookies-js';

// modules
import Alert from './modules/alert';

// 获取当前的语言类型
let locale = Cookies.get('REITsLocale');

// 生成二维码
$('#qrcode').qrcode({width: 180,height: 180,text: $('#qrcode').data('url')});

// 复制到剪接版
let clipboard = new Clipboard('#copyBtn');
clipboard.on('success', function(e) {
  Alert(Locales.getRewards[locale]['copy-success'], 5000, 'success');
});
clipboard.on('error', function(e) {
  Alert(Locales.getRewards[locale]['copy-failed'], 5000,);
});
