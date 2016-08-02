var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var fsExtra = require('fs-extra');
var logger = require('morgan');
var lusca = require('lusca');
var path = require('path');
var expressValidator = require('express-validator');

module.exports = function(app) {
  app.set('port', process.env.PORT || 3000);

  app.engine('hbs', exphbs({
    layoutsDir: 'views',
    defaultLayout: 'layout',
    extname: '.hbs'
  }));
  app.set('view engine', 'hbs');

  app.use(compression());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(expressValidator());
  app.use(lusca.xframe('SAMEORIGIN'));
  app.use(lusca.xssProtection(true));
  app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
};
