import isArrayLike from './isArrayLike';

export default (obj, callback) => {
  let length, i = 0;

  if (isArrayLike(obj)) {
    length = obj.length;

    for (; i < length; i++) {
      if (callback.call(obj[i], obj[i], i) === false) {
        break;
      }
    }
  } else {
    for (i in obj) {
      if (callback.call(obj[i], obj[i], i) === false) {
        break;
      }
    }
  }

  return obj;
}
