var kebab = require('./')
  , kb = kebab()
  , items = 10 
  , consumers = 4
  ;
                      
function produce () {
  var id = --items;

  if (id) {
    setTimeout(function () {
      console.log('Producer enqueueing item %d', id);
      kb.enqueue({ now: new Date() }, id);
      produce();
    }, 50);
  }

}

function consume (num) {
  kb.once(function (info, id) { 
    console.log(
        'Consumer %s handling item %d at (%ds:%dms).'
      , num, id, info.now.getSeconds(), info.now.getMilliseconds()
    ); 
    
    // younger consumers are lazy and therefore only consume once
    if (num > 1) {
      // heavy work going on
      setTimeout(function () { consume(num); }, 180);
    }
  });
}

for (var i = 0; i < consumers; i++) 
  consume(i);

produce();
