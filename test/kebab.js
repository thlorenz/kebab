/*jshint asi:true*/

var kebab = require('..')
  , test = require('tap').test;

function setup () {
  kb = kebab();
}

test('when an item is in the queue', function (t) {
  setup();
  t.plan(1);

  kb.enqueue('uno');

  t.test('# once calls back immediately with that item', function (t) {
    t.plan(1);
    kb.once(function (item) {
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

    kb.once(function (item) {
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

    kb.once(function (item) {
      calledBack = true;
      calledWith = item;
    })  

    t.test('# # and enqueue an item after', function (t) {
      t.plan(3);

      kb.enqueue('uno');

      t.equal(calledBack, true, 'calls back');
      t.equal('uno', calledWith, 'with queued item');

      t.test('# # # and enqueue another item after', function (t) {
        t.plan(2);

        calledBack = false;
        kb.enqueue('dos');

        t.equal(calledBack, false, 'does not call back again');

        t.test('# # # # and I listen once again', function (t) {
          t.plan(1);

          kb.once(function (item) {
            t.equal('dos', item, 'calls back with the other item');  
            t.end();
          })  
        })
      })
    })
  })
})

test('when I queue multiple arguments', function (t) {
  setup();
  kb.enqueue(1, 2, 'foo', { uno: 'eins' });

  t.test('and I listen once', function (t) {
    t.plan(4);  

    kb.once(function ($1, $2, foo, unoeins) {
      t.equal($1, 1, 'passes first number');
      t.equal($2, 2, 'passes second number');
      t.equal(foo, 'foo', 'passes string');
      t.deepEqual(unoeins, { uno: 'eins' }, 'passes object');
      t.end();
    })
  })
})




