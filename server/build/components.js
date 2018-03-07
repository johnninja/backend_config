const endOfLine = require('os').EOL;
const render = require('json-templater/string');
const uppercamelcase = require('uppercamelcase');
const camelcase = require('camelcase');
const decamelize = require('decamelize');

module.exports = (page) => {
	const MAIN_CONTENT = `import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageHeader, Search } from '../../../components';
import { {{actions}} } from '../actions';
import { RESET_STATE } from '../actionTypes';
import moment from 'moment';
{{include}}

class {{name}} extends Component{
	constructor(props) {
		super(props);
		this.state = {
			start: moment().subtract(6, 'days').format('YYYY-MM-DD'),
			end: moment().format('YYYY-MM-DD'),
		}
	}
	componentDidUpdate(prevProps, prevState) {
		const { dispatch, {{reducers}} } = this.props;

		{{componentDidUpdate}}
	}
	handleSearch() {
		const { start, end } = this.state;
		{{search}}
	}
	render() {
		const { start, end } = this.state;
		const { dispatch, {{reducers}} } = this.props;
		
		return <div>
			<PageHeader size="large">{{title}}</PageHeader>
			<Search
				indicator="使用"
				start={start}
				end={end} 
				handleSearch={() => this.handleSearch()}
				handleDayChange={(start, end) => this.setState({start, end})}
			/>
			<div className="report" style={{marginTop: '2rem', padding: '1rem'}}>
				{{group}}
			</div>
		</div>
	}
}
const mapStateToProps = state => {
	return {
		{{reducersObj}}
	}
}

export default connect(mapStateToProps)({{name}});
`

	const NAME = "{{name}}"
	const COMPONENT_UPDATED = `if ({{reducer}}.success !== '') {
			dispatch({type: RESET_STATE, index: {{index}}})
		}`
	const INCLUDE = `import {{name}} from './{{path}}';`
	const GROUP = `<{{name}}
					start={start}
					end={end}
					ref="group{{index}}"
					dispatch={dispatch}
					data={{{reducer}}}
					action={{{action}}}
					style={{marginBottom: '2rem'}}
				/>`
	const SERACH = `this.refs.group{{index}}.handleChange()`;
	const REDUCER = '{{name}}: state.{{name}},';

	let reducerTemplate = [];
	let componentUpdate = [];
	let groupTemplate = [];
	let actionTemplate = [];
	let searchTemplate = [];
	let mapStateTemplate = [];
	let includeTemplate = [];

	page.groups.forEach((group,index) => {
		let reducer = camelcase(group.name);
		let groupName = uppercamelcase(group.name);

		componentUpdate.push(render(COMPONENT_UPDATED,{
			reducer,
			index
		}));
		reducerTemplate.push(render(NAME, { name: reducer }));
		actionTemplate.push(render(NAME, {
			name: 'fetch' + groupName
		}));
		groupTemplate.push(render(GROUP, {
			name: groupName,
			reducer,
			index,
			action: 'fetch' + groupName
		}));
		searchTemplate.push(render(SERACH, { index }));
		mapStateTemplate.push(render(REDUCER, {
			name: reducer
		}));
		includeTemplate.push(render(INCLUDE,{
			name: groupName,
			path: decamelize(groupName)
		}))
	});

	var template = render(MAIN_CONTENT, {
		name: uppercamelcase(page.name),
		title: page.title,
		actions: actionTemplate.join(', '),
		reducers: reducerTemplate.join(', '),
		componentDidUpdate: componentUpdate.join(endOfLine),
		group: groupTemplate.join(endOfLine),
		search: searchTemplate.join(endOfLine),
		reducersObj: mapStateTemplate.join(endOfLine),
		include: includeTemplate.join(endOfLine)
	});
	return template;
}
