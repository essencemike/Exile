/**
 * 函数组合
 */
export default () => {
  const args = arguments;
  const start = args.length - 1;
  return () => {
    let i = start;
    let result = args[start].apply(this, arguments);
    while(i--) result = args[i].call(this, result);
    return result;
  };
};
