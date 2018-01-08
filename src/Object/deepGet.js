export default (obj, path) => {
  const length = path.length;
  for (let i = 0; i < length; i++) {
    if (obj === null) return void 0;
    obj = obj[path[i]];
  }
  return length ? obj : void 0;
};
