import deepGet from './deepGet';

export default (obj) => {
  if (obj === null) return () => {};

  return path => !Array.isArray(path) ? obj[path] : deepGet(obj, path);
};
