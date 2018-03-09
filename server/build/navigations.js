const endOfLine = require('os').EOL;
const render = require('json-templater/string');
const uppercamelcase = require('uppercamelcase');
const decamelize = require('decamelize');

module.exports = navigations => {
	const MAIN_CONTENT = "	{{path}}: {{content}}";
	const keyValues = [];
	navigations.forEach(item => {
		item.children.forEach(child => {
			child.path = `/${item.path}/${child.path}`;
		});
		keyValues.push(render(MAIN_CONTENT, {
			path: item.path,
			content: JSON.stringify(item)
		}));
	});
	let CONTENT = `export default {
{{keyValues}}
}`
	let template = render(CONTENT, {
		keyValues: keyValues.join(','+endOfLine)
	});
	return template
}