import React, { Component } from 'react';

class Select extends Component{

	render() {
		const { children } = this.props;
		return <div className="ui selection dropdown">
			<input type="hidden"/>
			<i className="icon dropdown"></i>
			<div className="default text"></div>
			<div className="menu">
				
			</div>
		</div>
	}
}
export default Select;