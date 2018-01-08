import { toArray } from './shared/util';

export default class EventBus {
  constructor () {
    this._events = Object.create(null);
  }

  /**
   * 监听事件
   * @param { String | Array<String> } event
   * @param { Function } fn
   * @return { EventBus }
   */
  listen (event, fn) {
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.listen(event[i], fn);
      }
    } else {
      (this._events[event] || (this._events[event] = [])).push(fn);
    }

    return this;
  }

  once (event, fn) {
    const vm = this;
    function on () {
      vm.off(event, on);
      fn.apply(vm, arguments);
    }

    on.fn = fn;
    this.listen(event, on);
    return this;
  }

  off (event, fn) {
    // all
    if (!arguments.length) {
      this._events = Object.create(null);
      return this;
    }

    // array event
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.off(event[i], fn);
      }
      return this;
    }

    // 具体事件
    const cbs = this._events[event];

    if (!cbs) {
      return this;
    }

    if (!fn) {
      this._events[event] = null;
      return this;
    }

    if (fn) {
      let i = cbs.length;
      let cb;

      while (i--) {
        cb = cbs[i];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i, 1);
          break;
        }
      }
    }

    return this;
  }

  emit (event) {
    let cbs = this._events[event];

    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      // 获取 除去第一个 eventName 的其他参数
      const args = toArray(arguments, 1);
      for (let i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(this, args);
        } catch (error) {
          console.log(error);
        }
      }
    }

    return this;
  }
}
