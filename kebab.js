(function () {
  var slice = Array.prototype.slice;

  function kebab() {
    var queue = []
      , subscriptions = [];

    return {
        enqueue : function () { 
          queue.push(slice.call(arguments)); 
          var sub = subscriptions.shift();
          if (sub) sub.apply(this, queue.shift());
        }
      , once    : function (cb) { 
          var args = queue.shift();
          return args ? cb.apply(this, args) : subscriptions.push(cb);
        }
    };
  }

  if (typeof define === 'function' && define.amd) {
    define(function () { return kebab; });
  } else if (typeof window === 'object') {
    window.kebab = kebab;
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = kebab;
  }
})();
