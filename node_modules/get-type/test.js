var test = require('tape');
var type = require('./');

test('getting types', function (t) {
  t.plan(13);

  t.deepEqual(type.get('{"a": 2014, "b": [1,2]}'), 'json', 'should return a json');
  t.deepEqual(type.get([1,2,3,4]), 'array', 'should return an array');
  t.deepEqual(type.get(true), 'boolean', 'should return a boolean');
  t.deepEqual(type.get(null), 'null', 'should return null');
  t.deepEqual(type.get(2014), 'number', 'should return a  number');
  t.deepEqual(type.get('a string message'), 'string', 'should return a string');
  t.deepEqual(type.get(), 'undefined', 'should return undefined');
  t.deepEqual(type.get(/w/), 'regexp', 'should return a regexp');
  t.deepEqual(type.get({a:1}), 'object', 'should return an object');
  t.deepEqual(type.get(new Date()), 'date', 'should return a date object');
  t.deepEqual(type.get(new Error()), 'error', 'should return an error object');
  t.deepEqual(type.get(function () {}), 'function', 'should return a function');
  t.deepEqual(type.get(new Buffer('')), 'buffer', 'should return a buffer');
});
