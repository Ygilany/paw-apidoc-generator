var expect = require('chai').expect;
var getType = require('../utils').getType;

describe('#getType', function () {
  it(`should return number when passed a number`, function () {
    var result = getType(1);
    expect(result).to.equal('Number');
  });

  it(`should return string when passed a string`, function () {
    var result = getType('a string');
    expect(result).to.equal('String');
  });

  it('should return boolean when passed a boolean value', function () {
    var result = getType(true);
    expect(result).to.equal('Boolean');
  });

  it('should return null when passed a undefined value', function () {
    var result = getType(undefined);
    expect(result).to.equal('Undefined');
  });

  it('should return null when passed a null value', function () {
    var result = getType(null);
    expect(result).to.equal('Null');
  });

  it('should return object when passed a json object', function () {
    var result = getType({"test":"test"});
    expect(result).to.equal('Object');
  });

  it('should return function when passed a function object', function () {
    var aFunc = function() {
      return;
    }
    var result = getType(aFunc);
    expect(result).to.equal('Function');
  });

  it('should return array when passed an array object', function () {
    var result = getType([1,2,3,4]);
    expect(result).to.equal('Array');
  });

  it('should return Error when passed an Error object', function () {
    var result = getType(new Error());
    expect(result).to.equal('Error');
  });

  it('should return Date when passed an Date object', function () {
    var result = getType(new Date());
    expect(result).to.equal('Date');
  });

  it('should return RegEx when passed an RegEx object1', function () {
    var result = getType(/a+c/);
    expect(result).to.equal('Regexp');
  });

  it('should return RegEx when passed an RegEx object2', function () {
    var result = getType(new RegExp('a+c'));
    expect(result).to.equal('Regexp');
  });

  it('should return symbol when passed an symbol object', function () {
    var sym = Symbol();
    var result = getType(sym);
    expect(result).to.equal('Symbol');
  });
});