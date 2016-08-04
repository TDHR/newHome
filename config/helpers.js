//helpers.js
var i18n = require('i18n');
module.exports = function() {
  var _helpers = {};
  // 声明handlebar中的i18n helper函数
  // __函数不考虑单复数
  _helpers.__ = function() {
    return i18n.__.apply(this, arguments);
  };
  // __n函数考虑单复数
  _helpers.__n = function() {
    return i18n.__n.apply(this, arguments);
  };
  return _helpers;
};
