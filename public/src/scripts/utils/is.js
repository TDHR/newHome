/**
 * 判断数据类型
 * @param {string} type [类型]
 * @param {*} input [要判断的值]
 */
export default (type, input) => {
  let res = true;
  const detect = (typeName) => {
    return Object.prototype.toString.call(input) === `[object ${typeName}]`
  };
  switch(type) {
    case 'Array':
    case 'String':
    case 'Object':
    case 'RegExp':
    case 'Number':
    case 'Function':
    case 'Null':
    case 'Undefined':
      res = detect(type);
      break;
    case 'EmptyObject':
      if (!detect('Object')) {
        res = false;
      } else {
        for (let key in input) {
          if (input.hasOwnProperty(key)) {
            res = false;
          }
        }
      }
      break;
  }
  return res;
};
