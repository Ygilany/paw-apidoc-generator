var handlebars = require('./handlebars');

var APIDocGenerator = function() {
	this.generate = function(context, requests, options) {
		var request = context.getCurrentRequest();

		var headers = [];
		var method = request.method;
		var request_name
		var jsonContent = false;
		var body = addslashes(request.body);

		for (var key in request.headers) {
			headers.push({
				name: key,
				value: request.headers[key]
			});
		}

		if (typeof request.jsonBody === 'object') {
			body = jsonBodyObject(request.jsonBody);
			jsonContent = true;
		}

		var view = {
			headers: headers,
			body: body,
			jsonContent: jsonContent,
			method: request.method,
			url: request.url
		};

		var template = handlebars.compile(readFile('./ApiDocTemplate.hbs'));

		return template(view);
	};
};

APIDocGenerator.identifier = 'com.ygilany.PawExtensions.JSDoc';
APIDocGenerator.title = 'JSDoc Paw Generator';
APIDocGenerator.languageHighlighter = 'coffeescript'; // The Javascript highlighter doesn't highlight :(
APIDocGenerator.fileExtension = 'js';

registerCodeGenerator(APIDocGenerator);

// I stole these from the jQuery Generator :(
var addslashes = function(str) {
	return ('' + str).replace(/[\\"]/g, '\\$&').replace(/\n/g, '');
};

var jsonBodyObject = function(object, indent) {
	var s;

	indent = indent ? indent : 0;

	if (object === null) {
		s = 'null';
	} else if (typeof object === 'string') {
		s = `'${addslashes(object)}'`;
	} else if (typeof object === 'number') {
		s = `${object}`;
	} else if (typeof object === 'boolean') {
		s = `${object}`;
	} else if (typeof object === 'object') {
		var indentStr = Array(indent + 2).join('    ');
		var indentStrChildren = Array(indent + 3).join('    ');

		if (object.length != null) {
			s = '[\n';

			for (var i = 0, len = object.length; i < len; i++) {
				s += `${indentStrChildren}${jsonBodyObject(object[i], indent + 1)}`;
				s += ',\n';
			}

			s += `${indentStr}]`;
		} else {
			s = '{\n';

			for (var key in object) {
				var value = object[key];
				s += `${indentStrChildren}'${addslashes(key)}': ${jsonBodyObject(value, indent + 1)},\n`;
			}

			s += `${indentStr}}`;
		}
	}

	return s;
};
