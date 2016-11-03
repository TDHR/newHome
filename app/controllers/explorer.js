var request = require('superagent');
var async = require('async');
var config = require('../../config/config');

/**
 * [页面：区块链浏览器]
 */
exports.index = function(req, res) {
  // 资产id
  var assetId = +req.params.assetId;
  async.auto({
    // 获取基础信息
    getBaseInfo: function(cb) {
      request
        .get(config.platform + '/papi/chainhome/getbaseinfo')
        .query({assetId: assetId})
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

    res.render('explorer/index', {
      nav: 'explorer',
      assetId: assetId,
      base: base.data,
      tops: tops.data,
      dayTrans: dayTrans.data,
      weekTrans: weekTrans.data,
      monthTrans: monthTrans.data
    });
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
  var userId = +req.params.userId;
  var txPageNum = +req.params.txPageNum || 1;
  txPageNum -= 1;
  async.auto({
    // 获取持仓人的基础信息
    getUserInfo: function(cb) {
      request
        .get(config.platform + '/papi/person/getbaseinfo')
        .query({
          assetId: assetId,
          userId: userId
        })
        .set('Accept', 'application/json')
        .end(function(err, result) {   
          cb(null, result);
        });
    },
    // 获取持仓人的钱包信息
    getWallet: function(cb) {
      request
        .get(config.platform + '/papi/person/getaddrbalance')
        .query({
          assetId: assetId,
          userId: userId,
          pageIndex: 0,
          pageSize: 999
        })
        .set('Accept', 'application/json')
        .end(function(err, result) {
          cb(null, result);
        });
    },
    // 获取持仓人的交易记录
    getTx: function(cb) {
      request
        .get(config.platform + '/papi/person/gettxdetail')
        .query({
          assetId: assetId,
          userId: userId,
          pageIndex: txPageNum,
          pageSize: 30
        })
        .set('Accept', 'application/json')
        .end(function(err, result) {
          cb(null, result);
        });
    },
  }, function(err, results) {
    var user = results.getUserInfo.body;
    var wallet = results.getWallet.body;
    var tx = results.getTx.body;

    res.render('explorer/user', {
      nav: 'explorer',
      assetId: assetId,
      userId: userId,
      user: user.data,
      wallet: wallet.data,
      tx: tx.data
    });
  });
};

/**
 * [页面：交易详情]
 */
exports.tx = function(req, res) {
  var assetId = +req.params.assetId;
  var txId = req.params.txId;
  async.auto({
    // 获取交易信息
    getTxInfo: function(cb) {
      request
        .get(config.platform + '/papi/person/gettxinfo')
        .query({
          txId: txId
        })
        .set('Accept', 'application/json')
        .end(function(err, result) {   
          cb(null, result);
        });
    }
  }, function(err, results) {
    var info = results.getTxInfo.body;

    var total = 0; // 交易总额
    if (info.data.list.length > 1) {
      for (var i = 0; i < info.data.list.length; i++) {
        if (info.data.list[i].way === 1) {
          total += info.data.list[i].amount;
        }
      }
    }

    res.render('explorer/tx', {
      nav: 'explorer',
      assetId: assetId,
      info: info.data,
      total: total,
      txId: txId
    });
  });
};
