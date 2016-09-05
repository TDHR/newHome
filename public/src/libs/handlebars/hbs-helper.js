Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);
  return {
    "+": lvalue + rvalue,
    "-": lvalue - rvalue,
    "*": lvalue * rvalue,
    "/": lvalue / rvalue,
    "%": lvalue % rvalue
  }[operator];
});

Handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
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
});

Handlebars.registerHelper("covertSize", function(bytes, decimals, options) {
  if (!bytes) {
    return '0 B';
  }
  let k = 1000; // 二进制时用 1024
  decimals = decimals + 1 || 2; // 默认保留两位
  let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
});

Handlebars.registerHelper("times", function(n, start, block) {
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
});

Handlebars.registerHelper("dateFormat", function(timestamp, type) {
  var fix = type === 'unix' ? 1000 : 1;
  var date = new Date(timestamp * fix);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
});
