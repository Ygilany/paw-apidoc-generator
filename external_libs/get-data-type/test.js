const assert = require('assert');
const m = require('./');

assert(m(null) === 'null', 'should return null');
assert(m(undefined) === 'undefined', 'should return undefined');
assert(m(true) === 'boolean', 'should return boolean');
assert(m(false) === 'boolean', 'should return boolean');
assert(m(1) === 'number', 'should return number');
assert(m('test') === 'string', 'should return string');
assert(m(Symbol()) === 'symbol', 'should return symbol');
assert(m({}) === 'object', 'should return object');
assert(m([]) === 'array', 'should return array');
assert(m(()=>{}) === 'function', 'should return function');
assert(m(new Date()) === 'date', 'should return date');
assert(m(new RegExp()) === 'regexp', 'should return regexp');
