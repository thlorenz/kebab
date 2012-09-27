/*jshint asi:true*/

var kebab = require('..')
  , test = require('tap').test;

function setup () {
  queue = kebab();
}

test('when an item is in the queue', function (t) {
  setup();
  t.plan(1);

  queue.enqueue('uno');

  t.test('# once calls back immediately with that item', function (t) {
    t.plan(1);
    queue.once(function (item) {
      t.equal('uno', item);  
      t.end();
    })  
  })
})

test('when no item is in the queue', function (t) {
  setup();
  t.plan(1);

  t.test('# and I listen once', function (t) {
    var calledBack = false;

    t.plan(1);

    queue.once(function (item) {
      calledBack = true;
    })  

    setTimeout(function () {
      t.equal(false, calledBack, 'does not immediately call back');
      t.end();
    }, 10);
  })
})

test('when no item is in the queue', function (t) {
  setup();
  t.plan(1);

  t.test('# and I listen once', function (t) {
    var calledBack = false
      , calledWith;

    t.plan(1);

    queue.once(function (item) {
      calledBack = true;
      calledWith = item;
    })  

    t.test('# # and enqueue an item after', function (t) {
      t.plan(3);

      queue.enqueue('uno');

      t.equal(calledBack, true, 'calls back');
      t.equal('uno', calledWith, 'with queued item');

      t.test('# # # and enqueue another item after', function (t) {
        t.plan(2);

        calledBack = false;
        queue.enqueue('dos');

        t.equal(calledBack, false, 'does not call back again');

        t.test('# # # # and I listen once again', function (t) {
          t.plan(1);

          queue.once(function (item) {
            t.equal('dos', item, 'calls back with the other item');  
            t.end();
          })  
        })
      })
    })
  })
})


