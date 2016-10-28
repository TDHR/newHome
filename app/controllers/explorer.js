var request = require('superagent');
var async = require('async');
var config = require('../../config/config');

/**
 * [页面：区块链浏览器]
 */
exports.index = function(req, res) {
  // 资产id
  var assetId = req.params.assetId;
  async.auto({
    // 获取基础信息
    getBaseInfo: function(cb) {
      // request
      //   .get(config.platform + '/papi/chainhome/getbaseinfo')
      //   .send({
      //     assetId: assetId
      //   })
      //   .set('Content-Type', 'application/x-www-form-urlencoded')
      //   .set('Accept', 'application/json')
      //   .end(function(err, result) {   
      //     cb(null, result);
      //   });
      cb(null, {
        body: {
          success: true,
          code: 0,
          message: "",
          data: {
            holdUserCount: 12, //持仓人数
            circulation: 1000, //资产发行量
            name: '瑞资通',
            'name-en': 'REITs Share'
          }
        }
      });
    },
    // 获取持仓排行
    getHoldTops: function(cb) {
      // request
      //   .get(config.platform + '/papi/chainhome/getholdtops')
      //   .send({
      //     assetId: assetId
      //   })
      //   .set('Content-Type', 'application/x-www-form-urlencoded')
      //   .set('Accept', 'application/json')
      //   .end(function(err, result) {   
      //     cb(null, result);
      //   });
      cb(null, {
        body: {
          success: true / false,
          code: 0,
          message: "",
          data: [{
            userId: 11,
            realName: '王大锤',
            balance: 100
          }, {
            userId: 12,
            realName: '李雷',
            balance: 200
          }, {
            userId: 13,
            realName: 'uu3',
            balance: 300
          }, {
            userId: 14,
            realName: 'uu4',
            balance: 400
          }, {
            userId: 15,
            realName: 'uu5',
            balance: 500
          }]
        }
      });
    },
    // 获取日交易排行
    getDayTransTops: function(cb) {
      // request
      //   .get(config.platform + '/papi/chainhome/getdaytranstops')
      //   .send({
      //     assetId: assetId
      //   })
      //   .set('Content-Type', 'application/x-www-form-urlencoded')
      //   .set('Accept', 'application/json')
      //   .end(function(err, result) {   
      //     cb(null, result);
      //   });

      cb(null, {
        body: {
          success: true,
          code: 0,
          message: "",
          data: [{
            userId: 12, //用户ID
            realName: 'uu', //用户实名
            trans: 12.34, //交易额
            balance: 123.233 //余额
          }, {
            userId: 12, //用户ID
            realName: 'uu', //用户实名
            trans: 12.34, //交易额
            balance: 123.233 //余额
          }, {
            userId: 12, //用户ID
            realName: 'uu', //用户实名
            trans: 12.34, //交易额
            balance: 123.233 //余额
          }, {
            userId: 12, //用户ID
            realName: 'uu', //用户实名
            trans: 12.34, //交易额
            balance: 123.233 //余额
          }]
        }
      })
    },
    // 获取周交易排行
    getWeekTransTops: function(cb) {
      // request
      //   .get(config.platform + '/papi/chainhome/getweektranstops')
      //   .send({
      //     assetId: assetId
      //   })
      //   .set('Content-Type', 'application/x-www-form-urlencoded')
      //   .set('Accept', 'application/json')
      //   .end(function(err, result) {   
      //     cb(null, result);
      //   });

      cb(null, {
        body: {
          success: true,
          code: 0,
          message: "",
          data: [{
            userId: 12, //用户ID
            realName: 'uu', //用户实名
            trans: 12.34, //交易额
            balance: 123.233 //余额
          }, {
            userId: 12, //用户ID
            realName: 'uu', //用户实名
            trans: 12.34, //交易额
            balance: 123.233 //余额
          }, {
            userId: 12, //用户ID
            realName: 'uu', //用户实名
            trans: 12.34, //交易额
            balance: 123.233 //余额
          }, {
            userId: 12, //用户ID
            realName: 'uu', //用户实名
            trans: 12.34, //交易额
            balance: 123.233 //余额
          }]
        }
      })
    },
    // 获取月交易排行
    getMonthTransTops: function(cb) {
      // request
      //   .get(config.platform + '/papi/chainhome/getmonthtranstops')
      //   .send({
      //     assetId: assetId
      //   })
      //   .set('Content-Type', 'application/x-www-form-urlencoded')
      //   .set('Accept', 'application/json')
      //   .end(function(err, result) {   
      //     cb(null, result);
      //   });

      cb(null, {
        body: {
          success: true,
          code: 0,
          message: "",
          data: [{
            userId: 12, //用户ID
            realName: 'uu', //用户实名
            trans: 12.34, //交易额
            balance: 123.233 //余额
          }, {
            userId: 12, //用户ID
            realName: 'uu', //用户实名
            trans: 12.34, //交易额
            balance: 123.233 //余额
          }, {
            userId: 12, //用户ID
            realName: 'uu', //用户实名
            trans: 12.34, //交易额
            balance: 123.233 //余额
          }, {
            userId: 12, //用户ID
            realName: 'uu', //用户实名
            trans: 12.34, //交易额
            balance: 123.233 //余额
          }]
        }
      })
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
  // request
  //   .get(config.platform + '/papi/chainhome/getturnoverrate')
  //   .send({
  //     assetId: req.query.assetId,
  //     beginDate: req.query.beginDate,
  //     endDate: req.query.endDate
  //   })
  //   .set('Content-Type', 'application/x-www-form-urlencoded')
  //   .set('Accept', 'application/json')
  //   .end(function(err, result) {
  //     var body = result.body;
  //     return res.json({
  //       success: body.success,
  //       code: body.code,
  //       msg: body.message
  //     }); 
  //   });
  return res.json({
    success: true,
    code: 0,
    msg: '',
    data: [{
      time: 1470355200,
      rate: 107
    }, {
      time: 1470614400,
      rate: 108
    }, {
      time: 1470700800,
      rate: 118
    }, {
      time: 1470787200,
      rate: 122
    }, {
      time: 1470873600,
      rate: 125
    }, {
      time: 1470960000,
      rate: 126
    }]
  });
};

/**
 * [页面：持仓人信息]
 */
exports.user = function(req, res) {
  var assetId = req.params.assetId;
  var userId = req.params.userId;
  var txPageNum = req.params.txPageNum || 1;
  async.auto({
    // 获取持仓人的基础信息
    getUserInfo: function(cb) {
      // request
      //   .get(config.platform + '/papi/person/getbaseinfo')
      //   .send({
      //     assetId: assetId,
      //     userId: userId
      //   })
      //   .set('Content-Type', 'application/x-www-form-urlencoded')
      //   .set('Accept', 'application/json')
      //   .end(function(err, result) {   
      //     cb(null, result);
      //   });
      cb(null, {
        body: {
          success: true,
          code: 0,
          message: "",
          data: {
            userId: 123, //用户ID
            circul: 1000, //发行量
            realName: '王大锤', //实名
            balance: 12.34, //持仓量
            topIndex: 2, //排名
            holdRate: 12 //持仓占比%
          }
        }
      });
    },
    // 获取持仓人的钱包信息
    getWallet: function(cb) {
      // request
      //   .get(config.platform + '/papi/person/getaddrbalance')
      //   .send({
      //     assetId: assetId,
      //     userId: userId
      //   })
      //   .set('Content-Type', 'application/x-www-form-urlencoded')
      //   .set('Accept', 'application/json')
      //   .end(function(err, result) {   
      //     cb(null, result);
      //   });
      cb(null, {
        body: {
          success: true,
          code: 0,
          message: "",
          data: [{
            address: '1H1JMXhrE5jYTYuxcR1onAM5boq3pv7jn1',
            balance: 11
          }, {
            address: '1H1JMXhrE5jYTYuxcR1onAM5boq3pv7jn2',
            balance: 12
          }]
        }
      });
    },
    // 获取持仓人的交易记录
    getTx: function(cb) {
      // request
      //   .get(config.platform + '/papi/person/gettxdetail')
      //   .send({
      //     assetId: assetId,
      //     userId: userId,
      //     pageIndex: txPageNum,
      //     pageSize: 30
      //   })
      //   .set('Content-Type', 'application/x-www-form-urlencoded')
      //   .set('Accept', 'application/json')
      //   .end(function(err, result) {   
      //     cb(null, result);
      //   });
      cb(null, {
        body: {
          success: true,
          code: 0,
          message: "",
          data: {
            count: 2888,
            total: 3,
            current: txPageNum,
            list: [{
              txid: '2664663ebb8e9a0c0e4cec652036ee77180ab47d9db6cc78e8c6267fe454613f',
              time: 1477645783,
              value: 1100,
              balance: 2200
            }, {
              txid: '2664663ebb8e9a0c0e4cec652036ee77180ab47d9db6cc78e8c6267fe454613f',
              time: 1477645783,
              value: 1200,
              balance: 1000
            }]
          }
        }
      });
    },
  }, function(err, results) {
    var user = results.getUserInfo.body;
    var wallets = results.getWallet.body;
    var tx = results.getTx.body;

    res.render('explorer/user', {
      nav: 'explorer',
      assetId: assetId,
      userId: userId,
      user: user.data,
      wallets: wallets.data,
      tx: tx.data
    });
  });
};

/**
 * [页面：交易明细]
 */
exports.tx = function(req, res) {
  var txId = req.params.txId;
  async.auto({
    // 获取交易信息
    getTxInfo: function(cb) {
      // request
      //   .get(config.platform + '/papi/person/gettxinfo')
      //   .send({
      //     txId: txId
      //   })
      //   .set('Content-Type', 'application/x-www-form-urlencoded')
      //   .set('Accept', 'application/json')
      //   .end(function(err, result) {   
      //     cb(null, result);
      //   });
      cb(null, {
        body: {
          success: true,
          code: 0,
          message: "",
          data: {
            time: 1477649582,
            confirmations: 4,
            list: [{
              address: '1H1JMXhrE5jYTYuxcR1onAM5boq3pv7jn1',
              assetid: 0,
              way: -1,
              amount: 1300
            }, {
              address: '1H1JMXhrE5jYTYuxcR1onAM5boq3pv7jn2',
              assetid: 0,
              way: 1,
              amount: 700
            }, {
              address: '1H1JMXhrE5jYTYuxcR1onAM5boq3pv7jn3',
              assetid: 0,
              way: 1,
              amount: 500
            }]
          }
        }
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
      info: info.data,
      total: total,
      txId: txId
    });
  });
};
