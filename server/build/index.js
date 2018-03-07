const endOfLine = require('os').EOL;
const render = require('json-templater/string');
const uppercamelcase = require('uppercamelcase');

module.exports = page => {
	const MAIN_CONTENT = `import * as reducers from './reducers';

export * from './actions';
export { default as {{name}} } from './components';
export default reducers;`;

	let template = render(MAIN_CONTENT, {
		name: uppercamelcase(page.name)
	});

	return template;
}