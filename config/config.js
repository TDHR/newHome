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
    platform: 'http://192.168.2.183:8080/reits',
    haobtcClientId: '292716efb54f42cb88a6',
    haobtcClientSecret: '5e7de2e903644ccb863d9499d4a9c2bf2399b19a'
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
