import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Animate from '../animation';

class Modal extends Component{
	constructor(props) {
		super(props);
		this.state = {
			translateX: 0,
			translateY: 0,
			widthRate: 0,
			heightRate: 0
		}
	}
	componentWillMount() {
		this.computeRate();
	}
	componentDidMount() {
		window.onresize = () => this.computeRate();
	}
	componentWillUnmount() {
		window.onresize = null;
	}
	computeRate(){
		const {left, top, width, height} = this.props;
		let winMidLeft = document.body.clientWidth/2;
		let winMidTop = document.body.clientHeight/2;

		this.setState({
			translateX: left - winMidLeft,
			translateY: top - winMidTop,
			widthRate: width/winMidLeft,
			heightRate: height/winMidTop
		});
	}
	render() {
		const {children,close} = this.props;
		const { translateX, translateY, widthRate, heightRate } = this.state;

		return <Animate type="zoom" ref="anim"
			initialStyle={{
				transformOrigin: 'center',
				transform: `translate3d(${translateX}px, ${translateY}px, 0) scale3d(${widthRate},${heightRate},1)`,
				transition: 'all .3s linear'
			}}
			endStyle={{
				transformOrigin: 'center',
				transform: 'translate3d(0, 0, 0) scale3d(1,1,1)',
				transition: 'all .3s linear'
			}}
			style={styles.modal}
			close={close}
		>
			<div onClick={e => e.stopPropagation()} style={styles.modalContainer}>{children}</div>
		</Animate>
	}
}

function modal(props={}, children){
	const div = document.createElement('div');
	div.className="ui dimmer active";
	div.style.position = 'fixed';
	document.body.appendChild(div);
	const component = React.createElement(Modal, {
		...props,
		close: () => {
			ReactDOM.unmountComponentAtNode(div);
			document.body.removeChild(div);
		}
	}, children);
	ReactDOM.render(component, div);
}
const styles = {
	modal: {
		display: 'flex',
		width: '100%',
		height: '100vh',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'left'
	},
	modalContainer: {
		padding: '1rem',
		width: '50%',
		height: '50%',
		backgroundColor: 'gray'
	}
}
export default { modal }