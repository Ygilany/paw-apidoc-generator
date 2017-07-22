# get-type

<a href="https://nodei.co/npm/get-type/"><img src="https://nodei.co/npm/get-type.png?downloads=true"></a>

[![Build Status](https://travis-ci.org/joaquimserafim/get-type.png?branch=master)](https://travis-ci.org/joaquimserafim/get-type)


####summary

Get the type of a variable or one unevaluated operand in easy way and provides all the **util.is*** functions from Node core.

**V1**

####app
`var type = require('get-type')`

`type.get(operand)` // returns a string
	
and all [core-utils-is](https://github.com/isaacs/core-util-is) functions:

* type.isArray(arr)
* type.isBoolean(bool)
* type.isNull(null)
* type.isNullOrUndefined(null)
* type.isNumber(num)
* type.isString(str)
* type.isSymbol(sym)
* type.isUndefined(undef)
* type.isRegExp(reg)
* type.isObject(obj)
* type.isDate(date)
* type.isError(err)
* type.isFunction(fn)
* type.isPrimitive(prim)
* type.isBuffer(buf)

more the [isJSON](https://github.com/joaquimserafim/is-json) function to check if a string is a valid JSON string 


####example

	  var t = require('assert');
	  var type = require('get-type');
	  
	  
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