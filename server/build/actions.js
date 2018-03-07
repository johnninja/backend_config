const endOfLine = require('os').EOL;
const render = require('json-templater/string');
const uppercamelcase = require('uppercamelcase');
const decamelize = require('decamelize');

module.exports = page => {
	const MAIN_CONTENT = `import fetch from 'isomorphic-fetch';
	import * as t from './actionTypes';
	import { RPT_APP_BASIC_API } from '../API';
	import { Alert } from '../../components';

	{{funcs}}

	{{fetchs}}
	`

	const FUNC_TEMPLATE = `function get{{name}}(){
		return {
			type: t.GET_{{constant}}
		}
	}
	function get{{name}}Success(payload){
		return {
			type: t.GET_{{constant}}_SUCCESS,
			list: payload
		}
	}

	function get{{name}}Failed(message){
		return {
			type: t.GET_{{constant}}_FAILED,
			message
		}
	}`;
	const FETCH_TEMPLATE = `export function fetch{{name}}(start, end, dateType='days'){
		return (dispatch, getState) => {
			dispatch(get{{name}}());
			return fetch('{{ api }}&BoxFishAccessToken=${localStorage.accessToken}')
			.then(res => res.json())
			.then(json => {
				dispatch(get{{name}}Success(json));
			})
			.catch((err) => {
				Alert.alert({message: err.toString(), type: 'error',  wait: 2000});
				dispatch(get{{name}}Failed(err.toString()));
			})
		}
	};`

	let funcTemplate = [];
	let fetchTemplate = [];

	page.groups.forEach((group,index) => {
		let upperName = uppercamelcase(group.name);
		let constant = decamelize(group.name);

		funcTemplate.push(render(FUNC_TEMPLATE, {
			name: upperName,
			constant: constant.toUpperCase()
		}));
		fetchTemplate.push(render(FETCH_TEMPLATE, {
			name: upperName
		}));
	})

	let template = render(MAIN_CONTENT, {
		funcs: funcTemplate.join(endOfLine),
		fetchs: fetchTemplate.join(endOfLine)
	});

	return template;
}

