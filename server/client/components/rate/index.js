import React, { Component } from 'react';

class Rate extends Component{
	constructor(props) {
		super(props);
		this.state = {
			rate: 5
		}
	}
	componentDidMount() {
		let { rate, limit } = this.props;
		if (isNaN(rate) || rate < limit) {
			rate = 5;
		}
		this.setState({rate});
	}
	handleClick(index){
		const { onClick, limit, disabled } = this.props;
		if (index < limit - 1 || this.state.rate == index + 1 || disabled) {
			return;
		}
		this.setState({
			rate: index + 1
		});
		onClick && onClick(index + 1);
	}
	render() {
		const { rate } = this.state;

		return <div className="ui huge item star rating" style={{paddingTop: 0, paddingBottom: 0}}>
			{[1,2,3,4,5].map((item,index) => {
				return <i className={rate > index ? 'icon active' : 'icon'} onClick={() => this.handleClick(index)} key={index}></i>
			})}
		</div>
	}
}
export default Rate;