var expect = require('chai').expect;
var getType = require('../utils').getType;

describe('#getType', function () {
  it(`should return number when passed a number`, function () {
    var result = getType(1);
    expect(result).to.equal('number');
  });

  it(`should return number when passed a stringified number`, function () {
    var result = getType('1');
    expect(result).to.equal('number');
  });

  it(`should return string when passed a string`, function () {
    var result = getType('a string');
    expect(result).to.equal('string');
  });

  it('should return boolean when passed a boolean value', function () {
    var result = getType(true);
    expect(result).to.equal('boolean');
  });

  it('should return null when passed a null value', function () {
    var result = getType(null);
    expect(result).to.equal('null');
  });

  it('should return object when passed a json object', function () {
    var result = getType({"test":"test"});
    expect(result).to.equal('object');
  });

  it('should return function when passed a function object', function () {
    var aFunc = function() {
      return;
    }
    var result = getType(aFunc);
    expect(result).to.equal('function');
  });
});