// tpl
import Tpl from '../tpl/tpl-site';

// utils
import Convert from './utils/convert';

// 获取微信文章
$.ajax({
  method: 'GET',
  url: '/articles',
  data: {
    page: 1,
    limit: 4
  },
  cache: false,
  success: function(res) {
    if (res.success) {
      if (res.data && res.data.articles.length) {
        let data = res.data;
        // 转换时间戳
        for (let i = 0; i < data.articles.length;  i++) {
          data.articles[i].date = Convert.timestamp(data.articles[i].date, 'ymd', true);
        }
        $('#articles').html(Tpl('articles', data));
      }
    }
  }
});
