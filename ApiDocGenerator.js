var handlebars = require('./handlebars');
var utils = require('./utils');

var APIDocGenerator = function () {
	this.generate = function (context, requests, options) {

		var request = context.getCurrentRequest();

		var headers = [];
		var params = [];
		var response = [];

		var responseBody = JSON.parse(request.getLastExchange().responseBody);
		if (responseBody.status === `SUCCESS` && responseBody.data) {
			extractKeyNamesAndTypes(responseBody.data, response);
		}

		extractKeyNamesAndTypes(request.headers, headers);
		extractKeyNamesAndTypes(request.urlParameters, params);
		extractKeyNamesAndTypes(request.jsonBody, params);


		var view = {
			headers: headers,
			params: params,
			response: response,
			method: request.method,
			request_name: request.name,
			request_description: request.description,
			request_group: request.parent ? request.parent.name : `...`,
			url: request.urlBase
		};

		var template = handlebars.compile(readFile('./ApiDocTemplate.hbs'));

		return template(view);
	};
};

function processor (key, type, result) {
	result.push({
		name: key,
		type
	});
}

var traverse = function(o, parent_key = null, result) {
	for (var key in o) {
		const parent = parent_key ? parent_key + "." : "";
		processor(`${parent}${key}`, `${utils.getType(o[key])}`, result)
		if (o[key] !== null && typeof(o[key])=="object") {
			traverse(o[key], `${parent}${key}`, result);
		}
	}
}

var extractKeyNamesAndTypes = function (theObj, resultsVariable) {
	traverse(theObj, null, resultsVariable)
};

APIDocGenerator.identifier = 'com.ygilany.PawExtensions.apiDocGenerator';
APIDocGenerator.title = 'ApiDoc Paw Generator';
APIDocGenerator.languageHighlighter = 'javascript'; // The Javascript highlighter doesn't highlight :(
APIDocGenerator.fileExtension = 'js';

registerCodeGenerator(APIDocGenerator);