// tpl
import Tpl from '../tpl/tpl-site';

// utils
import Convert from './utils/convert';

// 从 URL 参数中获取当前的页码
let pathname = location.pathname.split('/');
let pageNumber = pathname[pathname.length - 1];
pageNumber = (pageNumber !== 'knowledge') ? pageNumber : 1;

// 获取微信文章
$.ajax({
  method: 'GET',
  url: '/articles',
  data: {
    page: pageNumber,
    limit: 5
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

        // 启用分页
        data.pagination = true;
        
        $('#articles').html(Tpl('articles', data));
        
        setPagination();
      }
    }
  }
});

function setPagination() {
  if ($('#paginationHolder').length) {
    $('.pagination-holder').bootpag({
      total: $('#paginationHolder').data('total'),
      page: $('#paginationHolder').data('current'),
      maxVisible: 5,
      leaps: true,
      hrefVariable: '[number]',
      href: '/knowledge/[number]',
      wrapClass: 'pagination',
      activeClass: 'active',
      disabledClass: 'disabled'
    });
  }
}
