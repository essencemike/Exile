import deepGet from './deepGet';
import shallowProperty from './shallowProperty';

export default (path) => {
  if (!Array.isArray(path)) return shallowProperty(path);

  return obj => deepGet(obj, path);
};
