import React, { Component } from 'react';

class Loader extends Component{
	render() {
		const { text } = this.props;
		return <div className="ui active inverted dimmer">
			<div className="ui text loader">{text || ''}</div>
		</div>
	}
}
export default Loader;