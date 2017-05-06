var explorer = require('./../controllers/explorer');

module.exports = function(app, auth) {
  app.get('/explorer', explorer.index);

  // 资产首页
  app.get('/explorer/asset/:assetId', explorer.asset);

  // 获取换手率数据
  app.get('/explorer/turnover', explorer.turnover);

  // 页面：持仓人信息
  app.get('/explorer/asset/:assetId/user/:walletAddress/:tx?/:txPageNum?', explorer.user);

  // 页面：交易详情
  app.get('/explorer/tx/:txId', explorer.tx);

  // 页面：项目介绍
  app.get('/explorer/asset/:assetId/intro', explorer.intro);

  // 页面：企业介绍
  app.get('/explorer/company/:walletAddress', explorer.company);

  // 页面：发行资料
  app.get('/explorer/announce/:walletAddress', explorer.announce);
};