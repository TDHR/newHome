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
    platform: 'http://localhost:8080/api'
  },
  beta: {
    root: rootPath,
    public: rootPath + '/public/beta',
    app: {
      name: 'gold-rock'
    },
    port: process.env.PORT || 3000,
    platform: 'http://123.207.164.141:9080/reits'
  },
  production: {
    root: rootPath,
    public: rootPath + '/public/dist',
    app: {
      name: 'gold-rock'
    },
    port: process.env.PORT || 3000,
    platform: 'https://box.reitschain.com/reits'
  }
};

module.exports = config[env];
