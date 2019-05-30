const handlebars = require('./external_libs/handlebars');
const utils = require('./utils');

const APIDocGenerator = function () {
	this.generate = function (context, requests, options) {

		const request = context.getCurrentRequest();

		const headers = [];
		const params = [];
		const response = [];

		console.log(request.getLastExchange().responseStatusCode)
		const responseBody = JSON.parse(request.getLastExchange().responseBody);
		if (request.getLastExchange().responseStatusCode && responseBody.data) {
			extractKeyNamesAndTypes(responseBody.data, response);
		}

		extractKeyNamesAndTypes(request.headers, headers);
		extractKeyNamesAndTypes(request.urlParameters, params);
		extractKeyNamesAndTypes(request.jsonBody, params);


		const view = {
			headers: headers,
			params: params,
			response: response,
			method: request.method,
			request_name: request.name,
			api_name: utils.toCamelCase(request.name),
			request_description: request.description,
			request_group: request.parent ? request.parent.name : `...`,
			url: request.urlBase
		};

		handlebars.registerHelper('surroundWithCurlyBraces', function(text) {
			var result = '{' + text + '}';
			return new handlebars.SafeString(result);
		});
		const template = handlebars.compile(readFile('./ApiDocTemplate.hbs'));

		return template(view);
	};
};

function processor (key, type, result) {
	result.push({
		name: key,
		type
	});
}

const traverse = function(o, parent_key = null, result) {
	for (const key in o) {
		const parent = parent_key ? parent_key + "." : "";
		processor(`${parent}${key}`, `${utils.getType(o[key])}`, result)
		if (o[key] !== null && typeof(o[key])=="object") {
			traverse(o[key], `${parent}${key}`, result);
		}
	}
}

const extractKeyNamesAndTypes = function (theObj, resultsconstiable) {
	traverse(theObj, null, resultsconstiable)
};

APIDocGenerator.identifier = 'com.ygilany.PawExtensions.apiDocGenerator';
APIDocGenerator.title = 'ApiDoc Paw Generator';
APIDocGenerator.languageHighlighter = 'javascript'; // The Javascript highlighter doesn't highlight :(
APIDocGenerator.fileExtension = 'js';

registerCodeGenerator(APIDocGenerator);