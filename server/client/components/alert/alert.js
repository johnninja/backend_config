import React, { Component } from 'react';
import Transition from '../transition';

class Alert extends Component{
	static defaultProps = {
		top: 16
	}
	state = {
		visible: false
	}
	timer = null;
	componentDidMount() {
		const { wait } = this.props;
		this.setState({
			visible: true
		});
		if (wait) {
			this.timer = setTimeout(this.close.bind(this), wait)
		}
	}
	close() {
		if (this.timer) clearTimeout(this.timer);
		this.setState({
			visible: false
		});
		setTimeout(() => {
			this.props.onClose()
		},200)
	}
	render() {
		const { message, type = 'info', top } = this.props;
		return <Transition name="alert" duration="200">
			<div className="ui alert" key={this.state.visible} style={{display: this.state.visible ? 'block' : 'none', top}}>
				<div className={`ui message ${type}`}>
		          	<div className="content">{ message } <i className="icon close" style={{cursor: 'pointer', float: 'right'}} onClick={() => this.close()}></i></div>
		        </div>
			</div>
        </Transition>
	}
}

export default Alert;