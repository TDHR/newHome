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

  // 随机字符串
  if (env !== 'development') {
    tail = '?v=' + Math.random().toString(36).substr(2);
  }
  _helpers.fileTail = function() {
    return tail;
  };

  // 基本运算
  _helpers.math = function(lvalue, operator, rvalue) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
    return {
      "+": lvalue + rvalue,
      "-": lvalue - rvalue,
      "*": lvalue * rvalue,
      "/": lvalue / rvalue,
      "%": lvalue % rvalue
    }[operator];
  };

  // 处理姓名，除姓之外，全部处理为星号
  _helpers.handleName = function(name) {
    return name.substr(0, 1) + name.substr(1).replace(/./g, '*');
  };

  // 增强版 if
  _helpers.ifCond = function(v1, operator, v2, options) {
    switch (operator) {
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
        break;
      case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this);
        break;
      case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        break;
      case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this);
        break;
      case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        break;
      case '!==':
        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        break;
      default:
        return options.inverse(this)
        break;
    }
    return options.inverse(this);
  };

  // for 循环
  _helpers.times = function(n, start, block) {
    var accum = '';
    start = start || 0;
    if (start) {
      for (var i = start; i <= n; ++i) {
        accum += block.fn(i);
      }
    } else {
      for (var i = start; i < n; ++i) {
        accum += block.fn(i);
      }
    }
    return accum;
  };

  // 格式化时间戳
  _helpers.dateFormat = function(timestamp, type, unix) {
    var fix = unix === 'unix' ? 1000 : 1;
    var date = new Date(timestamp * fix);
    switch (type) {
      case 'ymd':
        result = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        break;

      case 'hms':
        result = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        break;

      default:
        result = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }
    return result;
  };

  return _helpers;
};
