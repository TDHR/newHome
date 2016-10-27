var request = require('superagent');
var async = require('async');
var config = require('../../config/config');

// exports.angels = function(req, res) {
//   res.render('explorer/angels', {
//     nav: 'explorer'
//   });
// };

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
          data:[{
            userId: 12, //用户ID
            realName: 'uu', //用户实名
            trans: 12.34, //交易额
            balance: 123.233 //余额
          },{
            userId: 12, //用户ID
            realName: 'uu', //用户实名
            trans: 12.34, //交易额
            balance: 123.233 //余额
          },{
            userId: 12, //用户ID
            realName: 'uu', //用户实名
            trans: 12.34, //交易额
            balance: 123.233 //余额
          },{
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

    res.render('explorer/index', {
      nav: 'explorer',
      assetId: assetId,
      base: base.data,
      tops: tops.data,
      dayTrans: dayTrans.data
    });
  });
};

exports.turnover = function(req, res) {
  // 资产id
  var assetId = req.params.assetId;

  // request
  //   .get(config.platform + '/papi/chainhome/getturnoverrate')
  //   .send({
  //     assetId: assetId
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
    data: [
      [1469491200000, 96],
      [1469577600000, 102],
      [1469664000000, 104],
      [1469750400000, 104],
      [1470009600000, 106],
      [1470096000000, 104],
      [1470182400000, 105],
      [1470268800000, 105],
      [1470355200000, 107],
      [1470614400000, 108],
      [1470700800000, 108],
      [1470787200000, 108],
      [1470873600000, 107],
      [1470960000000, 108],
      [1471219200000, 109]
    ]
  });
};
