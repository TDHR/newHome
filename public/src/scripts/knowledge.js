// pagination
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