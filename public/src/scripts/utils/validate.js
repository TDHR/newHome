/**
 * 校验
 */

// 邮箱
const email = (val) => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
};

// 手机号码
const mobile = (val) => {
  let re = /^1[3|4|5|7|8]\d{9}$/;
  return re.test(val);
};

// 数字
const num = (val) => {
  let re = /^\d+$/;
  return re.test(val);
};

// 大于等于 N 位
const length = (val, n) => {
  return val.length >= n;
};

export default {
  email: email,
  mobile: mobile,
  num: num,
  length: length
};
