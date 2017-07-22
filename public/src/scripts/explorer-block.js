// 交易列表的分页
$('.pagination-holder').bootpag({
  total: $('#paginationHolder').data('total'),
  page: $('#paginationHolder').data('current'),
  maxVisible: 5,
  leaps: true,
  wrapClass: 'pagination',
  activeClass: 'active',
  disabledClass: 'disabled'
}).on('page', function (event, num) {
  window.location.href = location.pathname.split('/tx')[0] + '/tx/' + num;
});
