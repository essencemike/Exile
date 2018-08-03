/**
 * 函数记忆
 * 使用场景： 大量的计算，而且后面的计算大量依赖前面的计算结果
 */
export default (func, hasher) => {
  // cachekey 默认是函数的第一个参数，如果设置了 hasher 则使用 hasher 生成的 key；
  const memoize = (cacheKey) => {
    const cache = memoize.cache;
    const address = '' + (hasher ? hasher.apply(this, arguments) : cacheKey);
    if (!cache[address]) {
      cache[address] = func.apply(this, arguments);
    }
    return cache[address];
  };
  memoize.cache = {};
  return memoize;
};
