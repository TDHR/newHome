/**
 * home page
 */
exports.home = function(req, res) {
  return res.render('home/index', {
    layout: 'layout',
    title: '瑞资 REITs Chain'
  });
};
