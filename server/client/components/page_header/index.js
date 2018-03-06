import React, { Component } from 'react';

class PageHeader extends Component{
	static defaultProps = {
		size: 'huge'
	}
	render() {
		const { size } = this.props;
		return <div className={`ui header ${size}`}>
			{this.props.children}
		</div>
	}
}

export default PageHeader;