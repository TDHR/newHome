// 交易列表的分页
$('.pagination-holder').bootpag({
  total: $('#paginationHolder').data('total'),
  page: $('#paginationHolder').data('current'),
  maxVisible: 5,
  leaps: true,
  hrefVariable: '[number]',
  href: location.pathname.split('/tx')[0] + '/tx/[number]',
  wrapClass: 'pagination',
  activeClass: 'active',
  disabledClass: 'disabled'
});
