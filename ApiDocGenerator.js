var handlebars = require('./handlebars');

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
					type: parseInt(request.headers[key])?`int`:`string`
				});
			}
		}

		for (var key in request.headers) {
			headers.push({
				name: key,
				type: parseInt(request.headers[key])?`int`:`string`
			});
		}

		for (var key in request.jsonBody) {
			params.push({
				name: key,
				type: parseInt(request.jsonBody[key])?`int`:`string`
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