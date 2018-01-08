import isObject from '../Object/isObject';

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `debounce` and `throttle`.
 *
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', debounce(calculateLayout, 150))
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }))
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * const debounced = debounce(batchLog, 250, { 'maxWait': 1000 })
 * const source = new EventSource('/stream')
 * jQuery(source).on('message', debounced)
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel)
 *
 * // Check for pending invocations.
 * const status = debounced.pending() ? "Pending..." : "Ready"
 */

function debounce (func, wait, options) {
  /**
   * TODO: 函数防抖，多次执行的时间小于wait时，函数不会执行，但是设置了 maxwait 后， 保证达到最大等待时间时执行一次
   * 1. 记录当前的时间
   * 2. 判断是否可以调用func
   *    1. lastCallTime 是 undefined 的时候，也就是第一次call
   *    2. time - lastCallTime 大于等于 wait 的时候
   *    3. time - lastCallTime 小于 0 , 修改了系统时间
   *    4. 当设置了 maxWait， 并且 time - lastInvokeTime 大于等于 maxWait 的时候
   *    满足任何一个即可选择调用
   * 3. 获取上次调用的参数，上下文。设置 lastCallTime = time
   * 4. 如果不能调用，判断 此时是否存在定时器，如果没有 设置定时器
   *    1. 如果可以调用， 判断此时是否存在定时器，如果没有， 根据参数 leading 判断是否开始执行
   *    2. 如果 设置了 最大等待时间， 重新设置定时器， 执行函数一次
   * 5. 返回函数执行的结果
   */
  let lastArgs, lastContext, maxWait, result, timerId, lastCallTime;

  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;

  if (typeof func !== 'function') {
    throw new TypeError('The first arguments must be a function');
  }

  wait = +wait || 0;

  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc (time) {
    const args = lastArgs;
    const context = lastContext;

    lastArgs = lastContext = undefined;
    lastInvokeTime = time;
    result = func.apply(context, args);
    return result;
  }

  function leadingEdge (time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }

  function shouldInvoke (time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    console.groupCollapsed('[ should invoke ]');
    console.log('time: ', time);
    console.log('lastCallTime: ', lastCallTime);
    console.log('lastInvokeTime: ', lastInvokeTime);
    console.log('maxing: ', maxing);
    console.log('maxWait: ', maxWait);
    console.log('wait', wait);
    console.log('timeSinceLastCall: ', timeSinceLastCall);
    console.log('timeSinceLastInvoke: ', timeSinceLastInvoke);
    console.groupEnd();

    // lastCallTime === undefined 表示第一次调用
    // timeSinceLastCall >= wait 表示距离上一次调用的时间超过了等待时间，（也就是说在 wait 这段时间内没有任何调用）
    // timeSinceLastCall < 0 系统时间往回调了
    // maxing && timeSinceLastInvoke >= maxWait 设置了最长等待时间，并且距离上次执行时间超过了最长等待时间
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function remainingWait (time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function timerExpired () {
    const time = Date.now();

    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }

    // 如果不能执行， 重新设置定时器，计算剩余时间
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge (time) {
    timerId = undefined;

    // 只有当上次执行参数存在时，才执行， 因为这说明函数是最近一次调用
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }

    lastArgs = lastContext = undefined;
    return result;
  }

  function cancel () {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastContext = timerId = undefined;
  }

  function flush () {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }

  function pending () {
    return timerId !== undefined;
  }

  function debounced (...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    lastContext = this;
    lastCallTime = time;

    if (isInvoking) {
      console.log('debounced isInvoking timerId: ', timerId);
      console.log('debounced isInvoking maxing: ', maxing);
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }

      if (maxing) {
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    console.log('debounced noInvoking: ', timerId);
    // 不可以调用，但此时上次调用被清掉， 重开定时器
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }

    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;

  return debounced;
}

export default debounce;
