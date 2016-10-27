var explorer = require('./../controllers/explorer');

module.exports = function(app, auth) {
  // 区块链浏览器
  app.get('/explorer/asset/:assetId', explorer.index);

  // 获取换手率数据
  app.get('/explorer/turnover', explorer.turnover);
};