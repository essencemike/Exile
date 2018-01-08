function bind (oThis) {
  if (typeof this !== 'function') {
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
  }

  var bindArgs = Array.prototype.slice.call(arguments, 1);
  var fToBind = this;
  var fNOP = function () {};
  var fBound = function () {
    var callArgs = Array.prototype.slice.call(arguments);
    return fToBind.apply(this instanceof fNOP ? this : oThis, bindArgs.concat(callArgs));
  };

  if (this.prototype) {
    fNOP.prototype = this.prototype;
  }

  fBound.prototype = new fNOP();

  return fBound;
}

Function.prototype.bind = Function.prototype.bind || bind;
