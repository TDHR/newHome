var explorer = require('./../controllers/explorer');

module.exports = function(app, auth) {
  app.get('/explorer', explorer.index);

  // 资产首页
  app.get('/explorer/asset/:assetId', explorer.asset);

  // 获取换手率数据
  app.get('/explorer/turnover', explorer.turnover);

  // 页面：持仓人信息
  app.get('/explorer/asset/:assetId/user/:userId/:tx?/:txPageNum?', explorer.user);

  // 页面：交易详情
  app.get('/explorer/asset/:assetId/tx/:txId', explorer.tx);

  // 页面：项目介绍
  app.get('/explorer/asset/:assetId/intro', explorer.intro);
};