var express = require('express');
var errorHandler = require('errorhandler');

// Create express server
var app = express();

require('./server/express')(app);

require('./server/router')(app);

// catch 404 and forward to error handler
// app.use(function(req, res) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   res.render('404', {
//     layout: 'layout'
//   });
// });

// development error handler
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res) {
//     res.status(err.status || 500);
//     res.render('500', {
//       layout: 'layout',
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// app.use(function(err, req, res) {
//   res.status(err.status || 500);
//   res.render('500', {
//     layout: 'layout',
//     message: err.message,
//     error: {}
//   });
// });

/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
