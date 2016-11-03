var explorer = require('./../controllers/explorer');

module.exports = function(app, auth) {
  // 页面：区块链浏览器
  app.get('/explorer/asset/:assetId', explorer.index);

  // 获取换手率数据
  app.get('/explorer/turnover', explorer.turnover);

  // 页面：持仓人信息
  app.get('/explorer/asset/:assetId/user/:userId/:tx?/:txPageNum?', explorer.user);

  // 页面：交易详情
  app.get('/explorer/asset/:assetId/tx/:txId', explorer.tx);
};