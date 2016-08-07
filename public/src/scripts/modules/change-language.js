// plugin
import Cookies from 'cookies-js';

/**
 * [切换语言]
 * @param {string} [type] ['zh' || 'en']
 */
export default (type) => {
  let current = Cookies.get('REITsLocale');
  console.log(type, current);
  if (current !== type) {
    Cookies.set('REITsLocale', type, {
      expires: Infinity
    });
    location.reload();
  }
};