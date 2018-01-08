if (!Array.from) {
  Array.from = (function () {
    var toString = Object.prototype.toString;

    var isCallable = function (fn) {
      return typeof fn === 'function' || toString.call(fn) === '[object Function]';
    };

    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }

      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };

    var maxSafeInteger = Math.pow(2, 53) - 1;

    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    return function from (arrayLike/*, mapFn, thisArg*/) {
      var C = this;
      var items = Object(arrayLike);

      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var args;
      if (typeof mapFn !== 'undefined') {
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        if (arguments.length > 2) {
          args = arguments[2];
        }
      }

      var len = toLength(items.length);

      var arr = isCallable(C) ? Object(new C(len)) : new Array(len);

      var k = 0;
      var KValue;

      while(k < len) {
        KValue = items[k];
        if (mapFn) {
          arr[k] = typeof args === 'undefined' ? mapFn(KValue, k) : mapFn.call(args, KValue, k);
        } else {
          arr[k] = KValue;
        }
        k += 1;
      }

      arr.length = len;

      return arr;
    };
  }());
}
