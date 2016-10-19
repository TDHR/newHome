var explorer = require('./../controllers/explorer');

module.exports = function(app, auth) {
  // 首轮天使额度公示页面
  app.get('/explorer', auth.needToLogin, explorer.angels);
};