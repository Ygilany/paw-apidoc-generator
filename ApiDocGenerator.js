var handlebars = require('./handlebars');
var utils = require('./utils');

var APIDocGenerator = function () {
	this.generate = function (context, requests, options) {

		var getType = function (obj) {
			if (obj === undefined) return 'Undefined';
			if (obj === null) return 'Null';

			var typeString = Object.prototype.toString.call(obj);
			return typeString.slice(typeString.indexOf(' ') + 1, -1);
		};
		var request = context.getCurrentRequest();

		var headers = [];
		var params = [];
		var response = [];

		var responseBody = JSON.parse(request.getLastExchange().responseBody);
		if (responseBody.status === `SUCCESS` && responseBody.data) {
			for (var res_key in responseBody.data) {
				response.push({
					name: res_key,
					type: utils.getType(responseBody.data[res_key])
				});
			}
		}

		for (var header_key in request.headers) {
			headers.push({
				name: header_key,
				type: utils.getType(request.headers[header_key])
			});
		}
		for (var url_param_key in request.urlParameters) {
			params.push({
				name: url_param_key,
				type: utils.getType(request.urlParameters[url_param_key])
			});
		}
		for (var body_key in request.jsonBody) {
			params.push({
				name: body_key,
				type: utils.getType(request.jsonBody[body_key])
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