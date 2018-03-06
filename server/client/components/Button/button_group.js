import React, { Component } from 'react';

class ButtonGroup extends Component{
	constructor(props) {
		super(props);
		this.state = {
			tabIndex: 0
		}
	}
	static defaultProps = {
		theme: 'basic',
		data: []
	}
	componentDidMount() {
		const { data, selected } = this.props;
		let index = 0;
		for (let i = 0; i < data.length; i++) {
			if (data[i].text == selected) {
				index = i;
				break;
			}
		}
		this.setState({
			tabIndex: index
		});
	}
	handleClick(index,value) {
		const { handleClick } = this.props;
		this.setState({
			tabIndex: index
		});
		if (handleClick) handleClick(value)
	}
	render() {
		const { data, theme } = this.props;
		return <div className={`ui buttons ${theme}`}>
			{data.map((item,index) => {
				return <button 
				  key={index} 
				  className={`ui button ${this.state.tabIndex == index && 'active'}`} 
				  onClick={() => this.handleClick(index, item.value)}>{item.text}</button>
			})}
		</div>
	}
}

export default ButtonGroup;