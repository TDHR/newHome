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

  if (env !== 'development') {
    tail = '?v=' + Math.random().toString(36).substr(2);
  }
  _helpers.fileTail = function() {
    return tail;
  };

  /**
   * [math 基本运算]
   * @param  {[number]} lvalue
   * @param  {[string]} operator
   * @param  {[number]} rvalue
   */
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

  /**
   * [handleText 处理字符串（加星号）]
   * @param  {[string]} value
   * @param  {[string]} type
   */
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

  /**
   * [ifCond 增强版 if]
   * @param  {[string, number]} v1       [参数1]
   * @param  {[string]} operator [比较符号]
   * @param  {[string, number]} v2       [参数2]
   * @param  {[type]} options
   */
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

  /**
   * [times for 循环]
   * @param  {[number]} n    
   * @param  {[number]} start
   * @param  {[object]} block
   */
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

  /**
   * [dateFormat 格式化时间戳]
   * @param  {[number]} timestamp [description]
   * @param  {[string]} type      [description]
   * @param  {[string]} unix      [description]
   */
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

  /**
   * [numberWithCommas 添加千位逗号]
   * @param  {[type]} num [数字]
   * @return {[type]}     [100,000,000]
   */
  _helpers.numberWithCommas = (num) => {
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  /**
   * [covertBytes 将 bytes 转换为更大的单位]
   * @param  {number} bytes [字节]
   * @param {number} decimals [保留几位小数]
   * @return {string} 
   */
  _helpers.covertBytes =  (bytes, decimals) => {
    if (!bytes) {
      return '0 B';
    }
    let k = 1000; // 二进制时用 1024
    decimals = decimals + 1 || 2; // 默认保留两位
    let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  };

  return _helpers;
};
