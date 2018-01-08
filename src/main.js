import EArray from './Array';
import ECollection from './Collection';
import EDate from './Date';
import EFunction from './Function';
import ELang from './Lang';
import EMath from './Math';
import ENumber from './Number';
import EObject from './Object';
import EString from './String';
import EUtil from './Util';

(function () {
  const root = typeof self == 'object' && self.self === self && self ||
    typeof global == 'object' && global.global === global && global ||
    this ||
    {};

  const ArrayProto = Array.prototype;
  const push = ArrayProto.push;

  const previousExile = root.Exile;

  const Ctor = function () {};

  const Exile = (obj) => {
    if (obj instanceof Exile) return obj;
    if (!(this instanceof Exile)) return new Exile(obj);
    this._wrapped = obj;
  };

  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = Exile;
    }
    exports.Exile = Exile;
  } else {
    root.Exile = Exile;
  }

  Exile.VERSION = '1.0.0';

  const allMethod = {
    ...EArray,
    ...ECollection,
    ...EDate,
    ...EFunction,
    ...ELang,
    ...EMath,
    ...ENumber,
    ...EObject,
    ...EString,
    ...EUtil
  };

  // 将所有的方法全部挂载到 Exile 上
  Object.keys(allMethod).forEach(key => {
    if (typeof allMethod[key] === 'function') Exile[key] = allMethod[key];
  });

  Exile.noConflict = () => {
    root.Exile = previousExile;
    return this;
  };

  Exile.mixin = (obj) => {
    Exile.each(Exile.functions(obj), (name) => {
      const func = Exile[name] = obj[name];
      Exile.prototype[name] = () => {
        const args = [this._wrapped];
        push.apply(args, arguments);
        return func.apply(Exile, args);
      };
    });

    return Exile;
  };

  Exile.mixin(Exile);
})();
