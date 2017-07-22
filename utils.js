exports.getType = function (op) {
  if (isPrimitive(op)) {
    return isNull(op) ? 'null' :
      isBoolean(op) ? 'boolean' :
      isNumber(op) ? 'number' :
      isSymbol(op) ? 'symbol' :
      isString(op) ? 'string' :
      isUndefined(op) ? 'undefined' : 'unknown';
  }

  if (isObject(op)) {
    return isArray(op) ? 'array' :
      isRegExp(op) ? 'regexp' :
      isDate(op) ? 'date' :
      isError(op) ? 'error' : 'object';
  }

  if (this.isFunction(op)) return 'function';
};

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}

function isDate(d) {
  return objectToString(d) === '[object Date]';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isString(arg) {
  return typeof arg === 'string';
}
function isSymbol(arg) {
  return typeof arg === 'symbol';
}
function isUndefined(arg) {
  return arg === void 0;
}

function isNull(arg) {
  return arg === null;
}

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}

function isBoolean(arg) {
  return typeof arg === 'boolean';
}