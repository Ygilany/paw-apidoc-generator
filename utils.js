// This is a combination of the Core-Utils library and some modifications on my part.
// I had some trouble using the npm packege here.

exports.getType = function (op) {
  if (isPrimitive(op)) {
    return isNull(op) ? 'null' :
      isBoolean(op) ? 'boolean' :
      isSymbol(op) ? 'symbol' :
      isNumber(op) ? 'number' :
      isString(op) ? 'string' :
      isUndefined(op) ? 'undefined' : 'unknown';
  }

  if (isObject(op)) {
    return isArray(op) ? 'array' :
      isRegExp(op) ? 'regexp' :
      isDate(op) ? 'date' :
      isError(op) ? 'error' : 'object';
  }

  if (isFunction(op)) return 'function';
};

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}

function isNull(arg) {
  return arg === null;
}

function isBoolean(arg) {
  return typeof arg === 'boolean';
}

function isSymbol(arg) {
  return typeof arg === 'symbol';
}

function isNumber(arg) {
  return typeof arg === 'number' || parseInt(arg);
}

function isString(arg) {
  return typeof arg === 'string';
}

function isUndefined(arg) {
  return arg === void 0;
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}

function isDate(d) {
  return objectToString(d) === '[object Date]';
}

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}

function isFunction(arg) {		
  return typeof arg === 'function';		
}

function objectToString(o) {		
  return Object.prototype.toString.call(o);		
}