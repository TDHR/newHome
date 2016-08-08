//helpers.js
var i18n = require('i18n');
var env = process.env.NODE_ENV || 'development';

module.exports = function() {
  var _helpers = {};
  var tail = ''; 
  // i18n helper函数 __函数不考虑单复数
  _helpers.__ = function() {
    return i18n.__.apply(this, arguments);
  };
  // i18n helper函数 __n函数考虑单复数
  _helpers.__n = function() {
    return i18n.__n.apply(this, arguments);
  };

  if (env !== 'development') {
    tail = '?v=' + Math.random().toString(36).substr(2);
  }
  _helpers.fileTail = function() {
    return tail;
  }

  _helpers.math = function(a, b, c) {
    var res = 0;
    switch(b) {
      case '+':
        res = a + c;
        break;
      case '-':
        res = a - c;
        break;
      case '*':
        res = a * c;
        break;
      case '/':
        res = a / c;
        break;
      case '%':
        res = a % c;
        break;
    }
    return res;
  }
  return _helpers;
};
