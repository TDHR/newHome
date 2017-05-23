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
        .get(config.platform + '/papi/chainhome/getassets')
        .set('Accept', 'application/json')
        .end(function(err, result) {
          cb(null, result);
        });
    }
  }, function(err, results) {
    var assets = results.getAssets.body;
    res.render('explorer/index', {
      layout: 'explorer',
      nav: 'explorer',
      assets: assets.data
    });
  });
};

/**
 * [资产详情]
 */
exports.asset = function(req, res) {
  // 资产id
  var assetId = +req.params.assetId;
  async.auto({
    // 获取基础信息
    getBaseInfo: function(cb) {
      request
        .get(config.platform + '/papi/chainhome/getbaseinfo')
        .query({ assetId: assetId })
        .set('Accept', 'application/json')
        .end(function(err, result) {
          cb(null, result);
        });
    },
    // 获取持仓排行
    getHoldTops: function(cb) {
      request
        .get(config.platform + '/papi/chainhome/getholdtops')
        .query({
          assetId: assetId,
          pageIndex: 0,
          pageSize: 20
        })
        .set('Accept', 'application/json')
        .end(function(err, result) {
          cb(null, result);
        });
    },
    // 获取日交易排行
    getDayTransTops: function(cb) {
      request
        .get(config.platform + '/papi/chainhome/getdaytranstops')
        .query({
          assetId: assetId,
          pageIndex: 0,
          pageSize: 20
        })
        .set('Accept', 'application/json')
        .end(function(err, result) {
          cb(null, result);
        });
    },
    // 获取周交易排行
    getWeekTransTops: function(cb) {
      request
        .get(config.platform + '/papi/chainhome/getweektranstops')
        .query({
          assetId: assetId,
          pageIndex: 0,
          pageSize: 20
        })
        .set('Accept', 'application/json')
        .end(function(err, result) {
          cb(null, result);
        });
    },
    // 获取月交易排行
    getMonthTransTops: function(cb) {
      request
        .get(config.platform + '/papi/chainhome/getmonthtranstops')
        .query({
          assetId: assetId,
          pageIndex: 0,
          pageSize: 20
        })
        .set('Accept', 'application/json')
        .end(function(err, result) {
          cb(null, result);
        });
    }
  }, function(err, results) {
    var base = results.getBaseInfo.body;
    var tops = results.getHoldTops.body;
    var dayTrans = results.getDayTransTops.body;
    var weekTrans = results.getWeekTransTops.body;
    var monthTrans = results.getMonthTransTops.body;

    if (base.data && base.data.circulation > 0 && base.data.name) {
      res.render('explorer/asset', {
        layout: 'explorer',
        nav: 'explorer',
        assetId: assetId,
        base: base.data,
        tops: tops.data,
        dayTrans: dayTrans.data,
        weekTrans: weekTrans.data,
        monthTrans: monthTrans.data
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
 * [换手率]
 */
exports.turnover = function(req, res) {
  request
    .get(config.platform + '/papi/chainhome/getturnoverrate')
    .query({
      assetId: +req.query.assetId,
      beginDate: req.query.beginDate,
      endDate: req.query.endDate
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
  var assetId = +req.params.assetId;
  var walletAddress = req.params.walletAddress;
  var txPageNum = +req.params.txPageNum || 1;
  txPageNum -= 1;
  async.auto({
    // 获取持仓人的基础信息
    getUserInfo: function(cb) {
      request
        .get(config.platform + '/papi/person/getbaseinfo')
        .query({
          assetId: assetId,
          walletAddress: walletAddress
        })
        .set('Accept', 'application/json')
        .end(function(err, result) {
          cb(null, result);
        });
    },
    // 获取持仓人的交易记录
    getTx: function(cb) {
      request
        .get(config.platform + '/papi/person/gettxlist')
        .query({
          assetId: assetId,
          walletAddress: walletAddress,
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
        assetId: assetId,
        walletAddress: walletAddress,
        user: user.data,
        tx: tx.data
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
        .get(config.platform + '/papi/person/gettxinfo')
        .query({
          txid: txId,
          walletAddress: "19YDUwPkCaq4ybVETmGbV8TS8gnTA14kaG"
        })
        .set('Accept', 'application/json')
        .end(function(err, result) {
          cb(null, result);
        });
    }
  }, function(err, results) {
    var info = results.getTxInfo.body;
    if (info.data) {
      var total = 0; // 交易总额
      if (info.data.list.length > 1) {
        for (var i = 0; i < info.data.list.length; i++) {
          if (info.data.list[i].way === 1) {
            total += info.data.list[i].amount;
          }
        }
      }
      res.render('explorer/tx', {
        layout: 'explorer',
        nav: 'explorer',
        info: info.data,
        total: total,
        txId: txId
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
 * [页面：项目介绍]
 */
exports.intro = function(req, res) {
  // 资产id
  var assetId = +req.params.assetId;
  request
    .get(config.platform + '/papi/assetinfo')
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
    .get(config.platform + '/papi/companyinfo')
    .query({
      rootAddress: walletAddress
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
    .get(config.platform + '/papi/assetannounce')
    .query({ assetId: assetId })
    .set('Accept', 'application/json')
    .end(function(err, result) {
      const body = result ? result.body : null;
      if (body && body.data) {
        res.render('explorer/announce', {
          layout: 'explorer',
          nav: 'explorer',
          assetId, assetId,
          asset: body.data.asset,
          announce: body.data.announce
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
