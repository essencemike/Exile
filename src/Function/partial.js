/**
 * 偏函数
 * 与函数柯里化的区别
 * 柯里化是将一个多参数函数转换成多个单参数函数，也就是将一个 n 元函数转换成 n 个一元函数。
 * 偏函数是固定一个函数的一个或者多个参数，也就是将一个 n 元函数转换成一个 n - x 元函数。
 */
export default (fn) => {
  const args = [].slice.call(arguments, 1);
  return () => {
    let position = 0, len = args.length;
    for (let i = 0; i < len; i++) {
      args[i] = args[i] === _ ? arguments[position++] : args[i];
    }
    while(position < arguments.length) args.push(arguments[position]);
    return fn.apply(this, args);
  };
};
