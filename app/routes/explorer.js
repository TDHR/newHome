var explorer = require('./../controllers/explorer');

module.exports = function(app, auth) {
  app.get('/explorer', explorer.index);

  // 搜索
  app.get('/explorer/search', explorer.search);

  // 页面：持仓人信息
  // app.get('/explorer/asset/:assetId/user/:walletAddress/:tx?/:txPageNum?', explorer.user);

  // 页面：交易详情
  // app.get('/explorer/tx/:txId', explorer.tx);

  // 页面：项目介绍
  app.get('/explorer/asset/:assetId/intro', explorer.intro);

  // 页面：企业介绍
  app.get('/explorer/company/:walletAddress', explorer.company);

  // 页面：发行资料
  app.get('/explorer/announce/:assetId', explorer.announce);
};
