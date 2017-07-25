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

var extractKeyNamesAndTypes = function (theObj, resultsVariable) {
	for (var key in theObj) {
		resultsVariable.push({
			name: key,
			type: utils.getType(theObj[key])
		});
	}
};

APIDocGenerator.identifier = 'com.ygilany.PawExtensions.apiDocGenerator';
APIDocGenerator.title = 'ApiDoc Paw Generator';
APIDocGenerator.languageHighlighter = 'javascript'; // The Javascript highlighter doesn't highlight :(
APIDocGenerator.fileExtension = 'js';

registerCodeGenerator(APIDocGenerator);