const endOfLine = require('os').EOL;
const render = require('json-templater/string');
const uppercamelcase = require('uppercamelcase');
const camelcase = require('camelcase');
const decamelize = require('decamelize');

module.exports = group => {
	const MAIN_CONTENT = `import React, { Component } from 'react';
import { Chart, Segment } from '../../../components';

class {{name}} extends Component{
	constructor(props) {
		super(props);
		this.state = {
			chartId: 0,
			options: {},
			dateType: 'days'
		}
	}
	componentDidUpdate(prevProps, prevState) {
		const { data } = this.props;
		if (data.success === true) {
			let options = USED_VISIT_ONE.getOption(data);
			this.setState({
				chartId: this.state.chartId + 1,
				options: options
			})
		}
	}
	componentDidMount() {
		const { dateType } = this.state;
		const { handleChange } = this.props;
		handleChange && handleChange(dateType);
	}
	handleChange(value) {
		const { dispatch, action, start, end } = this.props;
		const { dateType } = this.state;
		if (value) {
			this.setState({
				dateType: value
			});
		}
		dispatch(action(start, end, value || dateType));
	}
	render() {
		const { chartId, options } = this.state;
		const { data } = this.props;
		return <div style={{ ...this.props.style }}>
			<Segment
				title="{{title}}"
				handleChange={val => this.handleChange(val)}
				menus={[
					{text: '日', value: 'days'},
					{text: '周', value: 'weeks'},
					{text: '月', value: 'months'},
				]}
			>
				<Chart
					id={chartId}
					option={options}
					loading={data.fetching}
				/>
			</Segment>
		</div>
	}
}
export default {{name}};`;

	let template = render(MAIN_CONTENT, {
		name: uppercamelcase(group.name),
		title: group.title
	});

	return template;
}