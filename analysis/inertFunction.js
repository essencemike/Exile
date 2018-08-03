/**
 * 惰性函数：使用来减少每次代码执行时的重复性的分支判断，通过对对象的重新定义来屏蔽原来对象的分支判断
 * 使用场景：
 *  1. 应用频繁， 如果只用一次，是体现不出它的优点的
 *  2. 固定不变， 一次判定，在固定的应用环境中不会发生改变
 *  3. 复杂的分支判断，没有差异性，不需要应用这种模式
 * 例子：
 *  1. 需要写一个 foo 函数， 这个函数返回首次调用时的 Date 对象， 注意是首次。
 *  2. DOM 事件添加中， 为了兼容现代浏览器和 IE 浏览器， 我们需要对浏览器环境进行一次判断
 */

const foo = () => {
  const t = new Date();

  foo = () => t;

  return foo();
};

const addEvent = (type, element, func) => {
  if (element.addEventListener) {
    addEvent = (type, element, func) => {
      element.addEventListener(type, func, false);
    };
  } else if (element.attachEvent) {
    addEvent = (type, element, func) => {
      element.attachEvent(`on${type}`, func);
    };
  } else {
    addEvent = (type, element, func) => {
      element[`on${type}`] = func;
    }
  }

  addEvent(type, element, func);
};
