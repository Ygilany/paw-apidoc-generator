'use strict';

module.exports = (data) => {
	return typeof data === 'object'
			? Object.prototype.toString.call(data).match(/[^\s]+(?=\])/)[0].toLowerCase()
			: typeof data;
};