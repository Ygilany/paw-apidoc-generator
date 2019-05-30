const dataType = require(`./external_libs/get-data-type/index`);

exports.getType = function (op) {
  return dataType(op).replace(/^\w/, c => c.toUpperCase());
};

exports.toCamelCase = function (sentenceCase) {
  var out = "";
  sentenceCase.split(" ").forEach(function (el, idx) {
      var add = el.toLowerCase();
      out += (idx === 0 ? add : add[0].toUpperCase() + add.slice(1));
  });
  return out;
}