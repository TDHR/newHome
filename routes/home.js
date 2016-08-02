/**
 * Module dependencies.
 */
var homeCtr = require('./../controllers/home');

/**
 *  server `route`
 *  @param {function} app
 */
module.exports = function(app) {
    // 首页
    app.get('/', homeCtr.home);
};
