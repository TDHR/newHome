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

  // i18next init
  i18n.configure({
    locales: ['zh', 'en'],
    cookie: 'REITsLocale',
    directory: config.root + '/locales',
    defaultLocale: 'zh',
    updateFiles: false,
    extension: '.js'
  });

  app.use(cookieParser());
  app.use(i18n.init);

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
  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function(controller) {
    require(controller)(app);
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
