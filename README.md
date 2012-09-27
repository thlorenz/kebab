kebab [![Build Status](https://secure.travis-ci.org/thlorenz/kebab.png)](http://travis-ci.org/thlorenz/kebab)

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

***kebab.enqueue(item)***

item is what ever you want to pass when a subscriber callback is called.

**Example:**

```javascript
kb.enqueue('hello world');
```

### once

***kebab.once(callback)***

subscribe to a queued item. If one is currently available, callback will be invoked with it immediately.

Otherwise the callback will be invoked one time when an item is enqueued in the future.

**Example:**

```javascript
kb.once(function (arg) { console.log('working on ', arg); });
```
