const curry = (fn, args = [], holes = []) => {
  const length = fn.length;
  return () => {
    const _args = args.slice(0);
    const _holes = holes.length;
    const argsLen = args.length;
    const holesLen = holes.length;

    let arg, i, index = 0;

    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      // 处理类似 fn(1, _, _, 4)(_, 3) 这种情况， index 需要指向 holes 正确的下标
      if (arg === _ && holesLen) {
        index++;
        if (index > holesLen) {
          _args.push(arg);
          _holes.push(argsLen - 1 + index - holesLen);
        }
      }
      // 处理类似 fn(1)(_) 这种情况
      else if (arg === _) {
        _args.push(arg);
        _holes.push(argsLen + i);
      }
      // 处理类似 fn(_, 2)(1) 这种情况
      else if (holesLen) {
        if (index >= holesLen) {
          _args.push(arg);
        } else {
          _args.splice(_holes[index], 1, arg);
          _holes.splice(index, 1);
        }
      }
      else {
        _args.push(arg);
      }
    }

    if (_holes.length || _args.length < length) {
      return curry.call(this, fn, _args, _holes);
    } else {
      return fn.apply(this, _args);
    }
  };
};

export default curry;
