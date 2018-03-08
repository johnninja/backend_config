const endOfLine = require('os').EOL;
const render = require('json-templater/string');
const uppercamelcase = require('uppercamelcase');
const camelcase = require('camelcase');
const decamelize = require('decamelize');

module.exports = navigations => {
	const MAIN_CONTENT = `import { combineReducers } from 'redux';
import login from './login';
import auth from './auth';
import mainReducer from './main';
{{include}}


const { authCodes, orgNameList, orgSubNameList } = mainReducer;
{{extract}}

const rootReducer = combineReducers({
	login,
	auth,
	authCodes,
	orgNameList,
	orgSubNameList,
	{{reducers}}
});

export default rootReducer;`;

	let pages = navigations.reduce((prev,curr) => {
		return prev.concat(curr.children);
	}, []);

	const INDCLUDE = `import {{name}} from './{{path}}';`;
	const NAME = '{{name}}';
	const EXTRACT = 'const { {{reducers}} } = {{name}};';

	let includeTemplate = [];
	let reducerTemplate = [];
	let extractTemplate = [];

	pages.forEach(item => {
		let reducer = camelcase(item.name);
		let pathName = decamelize(item.name);

		includeTemplate.push(render(INDCLUDE, {
			name: reducer + 'Reducer',
			path: pathName
		}));
		let extractName = [];

		item.groups.forEach(group => {
			let reducerName = camelcase(group.name);
			extractName.push(reducerName);
			reducerTemplate.push(render(NAME, {
				name: reducerName
			}));
		});
		extractTemplate.push(render(EXTRACT, {
			reducers: extractName.join(', '),
			name: reducer + 'Reducer'
		}));
	})

	let template = render(MAIN_CONTENT, {
		include: includeTemplate.join(endOfLine),
		extract: extractTemplate.join(endOfLine),
		reducers: reducerTemplate.join(','+endOfLine)
	});

	return template;
}