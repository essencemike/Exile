import isFunction from './isFunction';

/**
 * 如果该对象中某个值是function， 则返回他的key
 */
export default (obj) => {
  const names = [];
  for (var key in obj) {
    if (isFunction(obj[key])) names.push(key);
  }
  return names.sort();
}
