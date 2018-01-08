import { toArray } from '../../../Util/shared/util';

/**
 * 初始化事件
 * vm = new Vue() 的实例
 * vm._events 用来存放所有监听事件
 * @param {*} vm
 */
export function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;

  // 用来初始化 parent 的监听事件 （DOM）
  // const listeners = vm.$options._parentListeners;
  // if (listeners) {
  //   updateComponentListeners(vm, listeners);
  // }
}

export function eventsMixin (Vue) {
  // 钩子函数的 正则
  const hookRE = /^hook:/;

  /**
   * 监听事件
   * @param {String | Array<string>} event
   * @param {Function} fn
   * @return vm (Vue 的实例)
   */
  Vue.prototype.$on = function (event, fn) {
    const vm = this;
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);

      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }

    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    const vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }

    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    const vm = this;
    // all, 不传参时，把所有事件解除
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    }

    // array of events
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.$off(event[i], fn);
      }
      return vm;
    }

    // 具体事件
    const cbs = vm._events[event];
    if (!cbs) {
      return vm;
    }

    if (!fn) {
      vm._events[event] = null;
      return vm;
    }

    if (fn) {
      let cb;
      let i = cbs.length;

      while(i--) {
        cb = cbs[i];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i, 1);
          break;
        }
      }
    }

    return vm;
  };

  Vue.prototype.$emit = function (event) {
    const vm = this;

    // 主要是判断DOM事件上的，html不区分大小写
    // if (process.env.NODE_ENV !== 'production') {
    //   const lowerCaseEvent = event.toLowerCase()
    //   if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
    //     tip(
    //       `Event "${lowerCaseEvent}" is emitted in component ` +
    //       `${formatComponentName(vm)} but the handler is registered for "${event}". ` +
    //       `Note that HTML attributes are case-insensitive and you cannot use ` +
    //       `v-on to listen to camelCase events when using in-DOM templates. ` +
    //       `You should probably use "${hyphenate(event)}" instead of "${event}".`
    //     )
    //   }
    // }

    let cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      const args = toArray(arguments, 1);
      for (let i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (error) {
          console.log(error);
        }
      }
    }

    return vm;
  };
}
