# kebab [![Build Status](https://secure.travis-ci.org/thlorenz/kebab.png)](http://travis-ci.org/thlorenz/kebab)

Half queue half pubsub. Super small and simple queue that supports subscribers.

```javascript
var kebab = require('kebab')
  , kb = kebab()
  , items = 10 
  , consumers = 4;
                      
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
    console.log( 'Consumer %s handling item %d at (%ds:%dms).'
      , num, id, info.now.getSeconds(), info.now.getMilliseconds()); 
    
    // younger consumers are lazy and therefore only consume once
    if (num > 1) setTimeout(function () { consume(num); }, 180);
  });
}

for (var i = 0; i < consumers; i++) consume(i);

produce();
```

Outputs:

    Producer enqueueing item 9
    Consumer 0 handling item 9 at (3s:879ms).
    Producer enqueueing item 8
    Consumer 1 handling item 8 at (3s:942ms).
    Producer enqueueing item 7
    Consumer 2 handling item 7 at (3s:995ms).
    Producer enqueueing item 6
    Consumer 3 handling item 6 at (4s:48ms).
    Producer enqueueing item 5
    Producer enqueueing item 4
    Consumer 2 handling item 5 at (4s:99ms).
    Producer enqueueing item 3
    Consumer 3 handling item 4 at (4s:150ms).
    Producer enqueueing item 2
    Producer enqueueing item 1
    Consumer 2 handling item 3 at (4s:202ms).
    Consumer 3 handling item 2 at (4s:252ms).
    Consumer 2 handling item 1 at (4s:303ms).

## Install

`npm install kebab`

## Run example

`npm run-script example`

## Run Tests

`npm test`

## API

### create a kebab

```javascript
var kebab = require('kebab')
  , kb = kebab();
```

### enqueue

***kebab.enqueue(arg1 [, arg2, .., argn])***

arg1 .. argn are the arguments you want to pass when a subscriber callback is called.

**Example:**

```javascript
kb.enqueue(1, 'hello world');
```

### once

***kebab.once(callback)***

Subscribe to be called back with queued arguments. 

If queue is currently holding arguments, callback will be invoked with them immediately.

Otherwise the callback will be invoked one time when arguments are enqueued in the future.

**Example:**

```javascript
kb.once(function (num, s) { console.log('working on num: %s - %s', num, s); });
```
