var request = require('superagent');
var async = require('async');
var config = require('../../config/config');

/**
 * [区块链浏览器首页]
 */
exports.index = function(req, res) {
  async.auto({
    getAssets: function(cb) {
      request
        .get(config.platform + '/papi/pbrower/getassets')
        .set('Accept', 'application/json')
        .end(function(err, result) {
          cb(null, result);
        });
    }
  }, function(err, results) {
    var body = results.getAssets.body;
    res.render('explorer/index', {
      layout: 'explorer',
      nav: 'explorer',
      assets: body.data.assets
    });
  });
};

/**
 * [搜索]
 */
exports.search = function(req, res) {
  request
    .get(config.platform + '/papi/pbrower/search')
    .query({
      key: req.query.key
    })
    .set('Accept', 'application/json')
    .end(function(err, result) {
      var body = result.body;
      return res.json({
        success: body.success,
        code: body.code,
        msg: body.message,
        data: body.data
      });
    });
};

/**
 * [页面：持仓人信息]
 */
exports.user = function(req, res) {
  var walletAddress = req.params.issueAddress;
  var txPageNum = +req.params.txPageNum || 1;
  txPageNum -= 1;
  async.auto({
    // 获取持仓人的基础信息
    getUserInfo: function(cb) {
      request
        .get(config.platform + '/papi/pbrower/getaddressinfo')
        .query({
          address: walletAddress
        })
        .set('Accept', 'application/json')
        .end(function(err, result) {
          cb(null, result);
        });
    },
    // 获取持仓人的交易记录
    getTx: function(cb) {
      request
        .get(config.platform + '/papi/pbrower/getaddresstxs')
        .query({
          address: walletAddress,
          pageIndex: txPageNum,
          pageSize: 20
        })
        .set('Accept', 'application/json')
        .end(function(err, result) {
          cb(null, result);
        });
    },
  }, function(err, results) {
    var user = results.getUserInfo.body;
    var tx = results.getTx.body;
    if (user.data && user.data.realName && user.data.walletAddress) {
      res.render('explorer/user', {
        layout: 'explorer',
        nav: 'explorer',
        walletAddress: walletAddress,
        user: user.data,
        tx: tx.data,
        pageIndex: txPageNum+1
      });
    } else {
      res.render('error/404', {
        message: 'Not Found',
        error: {
          status: 404
        },
        title: 'error'
      });
    }
  });
};

/**
 * [页面：交易详情]
 */
exports.tx = function(req, res) {
  var txId = req.params.txId;

  async.auto({
    // 获取交易信息
    getTxInfo: function(cb) {
      request
        .get(config.platform + '/papi/pbrower/gettxinfo')
        .query({
          txid: txId
        })
        .set('Accept', 'application/json')
        .end(function(err, result) {
          cb(null, result);
        });
    },
    // 获取交易明细
    getTxDetailed: function (cb) {
      request
        .get(config.platform + '/papi/pbrower/gettxdetail')
        .query({
          txid: txId
        })
        .set('Accept', 'application/json')
        .end(function (err, result) {
          cb(null, result);
        })
    }
  }, function(err, results) {
    var info = results.getTxInfo.body;
    var detail = results.getTxDetailed.body;
    if (info.data) {
      // var total = 0; // 交易总额
      // if (info.data.list.length > 1) {
      //   for (var i = 0; i < info.data.list.length; i++) {
      //     if (info.data.list[i].way === 1) {
      //       total += info.data.list[i].amount;
      //     }
      //   }
      // }
      res.render('explorer/tx', {
        layout: 'explorer',
        nav: 'explorer',
        info: info.data,
        // total: total,
        txId: txId,
        detail: detail.data
      });
    } else {
      res.render('error/404', {
        message: 'Not Found',
        error: {
          status: 404
        },
        title: 'error'
      });
    }
  });
};

/**
 * [页面：块信息]
 */
exports.block = function (req, res) {
  var blockHash = req.params.hash;
  var blPageNum = req.params.blPageNum ? req.params.blPageNum:1;
  blPageNum -= 1;
  async.auto({
    // 获取块基本信息
    getBlockInfo: function (cb) {
      request
        .get(config.platform + '/papi/pbrower/getblockinfo')
        .query({
          hash: blockHash
        })
        .set('Accept', 'application/json')
        .end(function(err, result) {
          cb(null, result);
        });
    },
    // 获取块中交易列表
    getBlockTx: function (cb) {
      request
        .get(config.platform + '/papi/pbrower/getblocktxs')
        .query({
          hash: blockHash,
          pageSize: 20,
          pageIndex: blPageNum
        })
        .set('Accept', 'application/json')
        .end(function (err, result) {
          cb(null, result);
        })
    }
  },function (err, results) {
    var info = results.getBlockInfo.body;
    var tx = results.getBlockTx.body;
    if(info.data){
      res.render('explorer/block',{
        layout: 'explorer',
        nav: 'explorer',
        info: info.data,
        tx: tx.data,
        pageIndex: blPageNum+1
      })
    }else {
      res.render('error/404', {
        message: 'Not Found',
        error: {
          status: 404
        },
        title: 'error'
      });
    }
  })
};

/**
 * [页面：资产介绍]
 */
exports.intro = function(req, res) {
  // 资产id
  var assetId = +req.params.assetId;
  request
    .get(config.platform + '/papi/pbrower/getassetintro')
    .query({
      assetId: assetId
    })
    .set('Accept', 'application/json')
    .end(function(err, result) {
      const body = result.body;
      if (body && body.success && body.data) {
        res.render('explorer/asset-intro', {
          layout: 'explorer',
          nav: 'explorer',
          data: body.data
        });
      } else {
        res.render('error/404', {
          message: 'Not Found',
          error: {
            status: 404
          },
          title: 'error'
        });
      }
    });
};

/**
 * [页面：企业介绍]
 */
exports.company = function(req, res) {
  var walletAddress = req.params.walletAddress;

  request
    .get(config.platform + '/explorer/companyinfo')
    .query({
      walletAddress: walletAddress
    })
    .set('Accept', 'application/json')
    .end(function(err, result) {
      const body = result ? result.body : null;
      if (body && body.success && body.data) {
        res.render('explorer/company', {
          layout: 'explorer',
          nav: 'explorer',
          data: body.data
        });
      } else {
        res.render('error/404', {
          message: 'Not Found',
          error: {
            status: 404
          },
          title: 'error'
        });
      }
    });
};

/**
 * [发行资料]
 */
exports.announce = function(req, res) {
  const assetId = +req.params.assetId;
  request
    .get(config.platform + '/papi/pbrower/getassetissuedata')
    .query({ assetId: assetId })
    .set('Accept', 'application/json')
    .end(function(err, result) {
      const body = result ? result.body : null;
      if (body && body.asset) {
        res.render('explorer/announce', {
          layout: 'explorer',
          nav: 'explorer',
          assetId,
          assetId,
          asset: body.asset,
          announce: body.asset.issues
        });
      } else {
        res.render('error/404', {
          message: 'Not Found',
          error: {
            status: 404
          },
          title: 'error'
        });
      }
    });
};
