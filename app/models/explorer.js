// mock data
var data = {};


// 从接口获取数据汇总数据
data.total = {
  total_circulation: 12345678.00,
  owners: 148
};

// 从接口获取持仓排行
data.positions = [{
  owner_id: 123,
  real_name: '王大锤',
  liquidity: 500,
  freeze: 300,
  packing: 0,
  balance: 800
}, {
  owner_id: 123,
  real_name: '王大锤',
  liquidity: 500,
  freeze: 300,
  packing: 0,
  balance: 800
}, {
  owner_id: 123,
  real_name: '王大锤',
  liquidity: 500,
  freeze: 300,
  packing: 0,
  balance: 800
}, {
  owner_id: 123,
  real_name: '王大锤',
  liquidity: 500,
  freeze: 300,
  packing: 0,
  balance: 800
}, {
  owner_id: 123,
  real_name: '王大锤',
  liquidity: 500,
  freeze: 300,
  packing: 0,
  balance: 800
}];

module.exports = data;
