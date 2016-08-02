var fs = require('fs');

var routesPath = __dirname + '/../routes';

module.exports = function(app) {
    fs.readdirSync(routesPath).forEach(function(file) {
        if (file.indexOf('.') > 0) {
        require(routesPath + '/' + file)(app);
      }
    });
};
