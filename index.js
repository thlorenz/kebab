function kebab() {
  var queue = []
    , subscriptions = [];

  return {
      enqueue : function (item) { 
        queue.push(item); 
        var sub = subscriptions.shift();
        if (sub) sub(queue.shift());
      }
    , once    : function (cb) { 
        var item = queue.shift();
        return item ? cb(item) : subscriptions.push(cb);
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
