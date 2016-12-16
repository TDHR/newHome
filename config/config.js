var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    public: rootPath + '/public/dev',
    app: {
      name: 'gold-rock'
    },
    port: process.env.PORT || 3000,
    weixin: 'http://app.reitschain.com',
    // platform: 'http://192.168.2.183:8080/reits',
    platform: 'http://123.207.164.141:9080/reits',
    haobtcClientId: '2e10c0dfb0b54be1a312',
    haobtcClientSecret: 'a760851fce234b1bae336cbe69c2a4faa200bbe5'
  },
  beta: {
    root: rootPath,
    public: rootPath + '/public/beta',
    app: {
      name: 'gold-rock'
    },
    port: process.env.PORT || 3000,
    weixin: 'http://app.reitschain.com',
    platform: 'http://123.207.164.141:9080/reits',
    haobtcClientId: '008c59a9491643f6b5e3',
    haobtcClientSecret: '49e5757ff78441c894df8020e168dd817296885f'
  },
  production: {
    root: rootPath,
    public: rootPath + '/public/dist',
    app: {
      name: 'gold-rock'
    },
    port: process.env.PORT || 3000,
    weixin: 'http://app.reitschain.com',
    platform: 'https://box.reitschain.com/reits',
    haobtcClientId: '908f8052f055442487f7',
    haobtcClientSecret: '59362bbdac004d9d82c2823e211b07a5d85f0e6b'
  }
};

module.exports = config[env];
