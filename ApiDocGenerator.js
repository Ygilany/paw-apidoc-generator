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

		var request_description_obj
		var request_description;
		var request_permissions = `...`;
		var api_version = `1.0.0`;
		var request_name_for_api_name = `...`;

		if (/^[\],:{}\s]*$/
				.test(request.description
				.replace(/\\["\\\/bfnrtu]/g, '@')
				.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
				.replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

			request_description_obj = JSON.parse(request.description);

			if (utils.getType(request_description_obj) === `object`) {
				request_permissions = request_description_obj.permissions ? request_description_obj.permissions : `....`;
				api_version = request_description_obj.version ? request_description_obj.version : `1.0.0`;
				request_description = request_description_obj.description ? request_description_obj.description : `....`;
				request_name_for_api_name = request_description_obj.name ? request_description_obj.name : `....`;
			}
		} else {
			request_description = request.description;
		}

		var view = {
			headers: headers,
			params: params,
			response: response,
			method: request.method,
			request_name: request.name,
			request_description: request_description,
			request_group: request.parent ? request.parent.name : `...`,
			api_version: api_version,
			request_name_for_api_name: request_name_for_api_name,
			request_permissions: request_permissions,
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