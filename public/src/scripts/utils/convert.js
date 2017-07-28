const bytes = (value, decimals) => {
  if (!value) {
    return '0 B';
  }
  let k = 1000; // 二进制时用 1024
  decimals = decimals + 1 || 2; // 默认保留两位
  let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let i = Math.floor(Math.log(value) / Math.log(k));
  return parseFloat((value / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
};

const timestamp = (value, type, unix) => {
  // 如果是 unix 时间戳，需要乘以1000
  let fix = unix ? 1000 : 1;
  let date = new Date(value * fix);
  let result = '';
  switch (type) {
    case 'ymd':
      result = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`;
      break;

    case 'hms':
      result = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      break;

    default:
      result = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
  return result;
};

const seconds = (value) => {
  if (!value) {
    return 0;
  }
  let time = '';
  if (value >= 24 * 3600) {
    time += parseInt(value / (24 * 3600)) + '天';
    value %= (24 * 3600);
  }
  if (value >= 3600) {
    time += parseInt(value / 3600) + '小时';
    value %= 3600;
  }
  if (value >= 60) {
    time += parseInt(value / 60) + '分钟';
    value %= 60;
  }
  if (value > 0) {
    time += value + '秒';
  }
  return time;
};

const numberWithCommas = (value) => {
  var parts = value.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export default {
  bytes: bytes,
  timestamp: timestamp,
  seconds: seconds,
  numberWithCommas: numberWithCommas
};
