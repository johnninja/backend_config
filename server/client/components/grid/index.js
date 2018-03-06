import React, { Component } from 'react';


class Row extends Component{
	render() {
		return <div className="ui grid column">
			{ this.props.children }
		</div>
	}
}

export default Row;