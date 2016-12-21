//helpers.js
var i18n = require('i18n');
var env = process.env.NODE_ENV || 'development';

module.exports = function() {
  var _helpers = {};
  var tail = '';

  // i18n helper函数 __函数不考虑单复数
  _helpers.__ = function(str, options) {
    this.locale = this.locale || options.data.root.locale;
    return i18n.__.apply(this, arguments);
  };

  // i18n helper函数 __n函数考虑单复数
  _helpers.__n = function(str, options) {
    this.locale = this.locale || options.data.root.locale;
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

  // 处理字符串（加星号）
  _helpers.handleText = function(value, type) {
    var result = '';
    switch (type) {
      // 除第一个字，全部处理为星号
      case '1':
        result = value.substr(0, 1) + value.substr(1).replace(/./g, '*');
        break;

        // 除了最后一个字，全部处理为星号
      case '2':
        result = value.replace(/.(?=.)/g, '*');
        break;

        // 处理身份证，除了前两位和后四位，全部处理为星号
      case '3':
        result = value.replace(/(\d{2})\d{12}(\d{4})/, "$1************$2");
        break;

        // 处理手机号码，中间四位处理为星号
      case '4':
        result = value.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
        break;

        // 处理银行卡号，除了最后四位，全部处理为星号
      case '5':
        result = '**** ' + value.substr(-4, 4);
        break;
    }

    return result;
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
        result = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        break;

      case 'hms':
        result = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
        break;

      default:
        result = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
    }
    return result;
  };

  return _helpers;
};
