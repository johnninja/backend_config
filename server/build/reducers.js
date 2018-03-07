const endOfLine = require('os').EOL;
const render = require('json-templater/string');
const uppercamelcase = require('uppercamelcase');
const camelcase = require('camelcase');
const decamelize = require('decamelize');

module.exports = page => {
	const MAIN_CONTENT = `import * as t from './actionTypes';
	{{reducers}}
	`;
	const REDUCER_TEMPLATE = `export function {{reducer}}(state={
		list: [],
		message: '',
		success: '',
		fetching: false,
	},action){
		switch (action.type){
			case t.GET_{{constant}}:
				return {
					...state, 
					fetching: true
				};
			case t.GET_{{constant}}_SUCCESS:
				return {
					...state,
					list: action.list,
					success: true,
					fetching: false
				};
			case t.GET_{{constant}}_FAILED:
				return{
					...state, 
					message: action.message,
					success: false,
					fetching: false
				};
			case t.RESET_STATE:
				if (action.index != {{index}}) {
					return state;
				}
				return {
					...state,
					message: '',
					success: ''
				}
			default:
				return state;
		}
	}`;
	let reducerTemplate = [];

	page.groups.forEach((group,index) => {
		let reducer = camelcase(name);
		let constant = decamelize(group.constant);
		reducerTemplate.push(render(REDUCER_TEMPLATE, {
			reducer,
			index,
			constant: constant.toUpperCase()
		}))
	});

	let template = render(MAIN_CONTENT, {
		reducers: reducerTemplate.join(endOfLine)
	});

	return template;
}