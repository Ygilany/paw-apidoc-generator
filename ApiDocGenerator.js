var handlebars = require('./handlebars');
var type = require('./utils/get-type');

console.log(getType)
var APIDocGenerator = function() {
	this.generate = function(context, requests, options) {
		var request = context.getCurrentRequest();

		var headers = [];
		var params = [];
		var response = [];

		var responseBody = JSON.parse(request.getLastExchange().responseBody);
		if (responseBody.status === `SUCCESS` && responseBody.data) {
			for (var key in responseBody.data) {
				response.push({
					name: key,
					type: type.get(responseBody.data[key])
				});
			}
		}

		for (var key in request.headers) {
			headers.push({
				name: key,
				type: type.get(request.headers[key])
			});
		}

		for (var key in request.jsonBody) {
			params.push({
				name: key,
				type: type.get(request.jsonBody[key])
			});
		}

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

APIDocGenerator.identifier = 'com.ygilany.PawExtensions.apiDocGenerator';
APIDocGenerator.title = 'ApiDoc Paw Generator';
APIDocGenerator.languageHighlighter = 'javascript'; // The Javascript highlighter doesn't highlight :(
APIDocGenerator.fileExtension = 'js';

registerCodeGenerator(APIDocGenerator);