# kebab [![Build Status](https://secure.travis-ci.org/thlorenz/kebab.png)](http://travis-ci.org/thlorenz/kebab)

Half queue half pubsub. Super small and simple queue that supports subscribers.

## Installation

`npm install kebab`

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
