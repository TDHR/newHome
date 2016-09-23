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
    platform: 'http://192.168.2.103:8080/reits'
  },
  production: {
    root: rootPath,
    public: rootPath + '/public/dist',
    app: {
      name: 'gold-rock'
    },
    port: process.env.PORT || 3000,
    weixin: 'http://app.reitschain.com',
    platform: 'http://123.207.165.134:8080/reits'
  }
};

module.exports = config[env];
