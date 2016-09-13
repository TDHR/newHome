// 我的资产
exports.index = function(req, res) {
  res.render('platform/dashboard', {
    nav: 'dashboard'
  });
};

// 钱包详情
exports.wallet = function(req, res) {
  res.render('platform/wallet', {
    nav: 'dashboard'
  });
};

// 绑定钱包
exports.bindWallet = function(req, res) {
  res.render('platform/bind-wallet', {
    nav: 'dashboard'
  });
};

// 修改分红地址
exports.updateDividend = function(req, res) {
  res.render('platform/update-dividend', {
    nav: 'dashboard'
  });
};
