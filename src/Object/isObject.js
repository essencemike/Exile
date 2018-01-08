/**
 * 判断 value 是否是 object
 * @param {*} value
 * @returns { Boolean }
 *
 * isObject({}) => true
 * isObject([1, 2, 3]) => true
 * isObjetc(Function) => true
 * isObject(null) => false
 * isObject(undefined) => false
 */
function isObject (value) {
  const type = typeof value;
  return value !== null && value !== undefined && (type === 'object' || type === 'function');
}

export default isObject;
