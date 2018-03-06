import React, { Component } from 'react';

class Animate extends Component{
	constructor(props) {
		super(props);
		this.state = {
			animStyle: null
		}
		this.timer = null;
	}
	static defaultProps = {
		style: {}
	}
	componentDidMount() {
		const { type, endStyle } = this.props;
		this.timer = setTimeout(() => {
			this.setState({
				animStyle: endStyle
			});
			clearTimeout(this.timer);
		}, 100);
	}
	handleClose(){
		const { initialStyle, close } = this.props;
		this.setState({
			animStyle: initialStyle
		});
		this.timer = setTimeout(close, 300);
	}
	componentWillUnmount() {
		clearTimeout(this.timer);
	}
	render() {
		const { name, children, style, initialStyle, endStyle } = this.props;
		const { animStyle } = this.state;
		const animStyles = animStyle ? animStyle : initialStyle;

		return <div style={style || {}} onClick={() => this.handleClose()}>
			{React.cloneElement(children, {
				style: {...children.props.style,...animStyles}
			})}
		</div>
	}
}

const styles = {
	fade: {
		opacity: 0,
		transition: 'opacity .3s ease-in'
	},
	fadeIn: {
		opacity: 1,
		transition: 'opacity .3s ease-out 0.3s'
	},
	fadeOut: {
		opacity: 0,
		transition: 'opacity .3s ease-out'
	},
	slideTop: {
		transform: 'translateY(-100px)',
		opacity: 0
	},
	slideTopIn: {
		transform: 'translateY(0)',
		opacity: 1,
		transition: 'all .3s linear'
	},
	slideTopOut: {
		transform: 'translateY(-100px)',
		opacity: 0,
		transition: 'all .3s linear'
	},
	// zoom: {
	// 	transform: 'translate3d(-100px, 100px, 0) scale3d(0,0,1)',
	// 	transition: 'all .3s linear'
	// },
	zoomIn: {
		transform: 'translate3d(0, 0, 0) scale3d(1,1,1)',
		transition: 'all .3s linear'
	},
	zoomOut: {
		transform: 'translate3d(100px, -100px, 0) scale3d(0,0,1)',
		transition: 'all .3s linear'
	},
};

export default Animate;