const endOfLine = require('os').EOL;
const render = require('json-templater/string');
const decamelize = require('decamelize');

module.exports = page => {
	const CONSTANTS = `export const GET_{{name}} = 'GET_{{name}}';
	export const GET_{{name}}_SUCCESS = 'GET_{{name}}_SUCCESS';
	export const GET_{{name}}_FAILED = 'GET_{{name}}_FAILED';`;
	let constantTemplate = [];

	page.groups.forEach(group => {
		let name = decamelize(group.name);
		constantTemplate.push(render(CONSTANTS, {
			name: name.toUpperCase()
		}));
	})
	return constantTemplate.join(endOfLine);
}