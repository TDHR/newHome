var express = require('express');
var glob = require('glob');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var i18n = require("i18n");

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env === 'development';

  app.set('trust proxy', 'loopback');
  
  app.use(cookieParser());

  // 添加setLocale中间件，注意必须在session之后
  app.use(setLocale);

  // 定义setLocale中间件
  function setLocale(req, res, next) {
    var languages = ['zh', 'en'];
    var locale;

    // i18next init
    i18n.configure({
      locales: languages,
      fallbacks: { 'zh': 'zh-en', 'en': 'en-us' },
      defaultLocale: 'zh',
      cookie: 'REITsLocale',
      directory: config.root + '/locales',
      updateFiles: false,
      extension: '.js',
      register: res
    });

    if (req.cookies['REITsLocale']) { // 获取cookie中的locale数据
      locale = req.cookies['REITsLocale'];
    } else if (req.acceptsLanguages()) { // 获取浏览器的偏好语言，这个函数是express提供的
      var first = req.acceptsLanguages()[0];
      if (!first.indexOf('zh')) {
        locale = 'zh';
      } else if (!first.indexOf('en')) {
        locale = 'en';
      } else {
        locale = 'zh';
      }
    } else { // 没有语言偏好的时候网站使用的语言为中文
      locale = 'zh';
    }
    // 如果cookie中没有保存语言偏好
    if (!req.cookies['REITsLocale']) {
      res.cookie('REITsLocale', locale);
    }

    // 设置i18n对这个请求所使用的语言
    res.setLocale(locale);
    next();
  };

  app.engine('handlebars', exphbs({
    layoutsDir: config.root + '/app/views/layouts/',
    defaultLayout: 'default',
    partialsDir: [config.root + '/app/views/partials/'],
    helpers: new require('./helpers')()
  }));

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'handlebars');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(compress());
  app.use(express.static(config.public));
  app.use(methodOverride());

  var auth = require('../config/auth');
  var routes = glob.sync(config.root + '/app/routes/*.js');
  routes.forEach(function(route) {
    require(route)(app, auth);
  });

  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error/' + (err.status || 500), {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error/' + (err.status || 500), {
      message: err.message,
      error: {},
      title: 'error'
    });
  });
};
