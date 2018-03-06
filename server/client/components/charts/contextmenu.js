import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ContextMenu extends Component{
	constructor(props) {
		super(props);
		this.state = {
			top: 0,
			left: 0
		}
	}
	componentDidMount() {
		const { event, close } = this.props;
		const winWidth = document.body.clientWidth;
		const winHeight = document.body.clientHeight;
		const menu = this.refs.menu;

		let scrollTop = (() => {
			if (document.documentElement) {
				return document.documentElement.scrollTop;
			}
			return document.body.scrollTop;
		})();
		let left = event.clientX, top = event.clientY;

		if (menu.offsetWidth + event.clientX > winWidth) {
			left = event.clientX - menu.offsetWidth;
		}

		if (menu.offsetHeight + event.clientY > winHeight) {
			top = event.clientY - menu.offsetHeight;
		}

		this.setState({left, top})
	}
	render() {
		const { close, children } = this.props;
		const { left, top } = this.state;
		return <div className="ui dimmer active" style={{position: 'fixed', backgroundColor: 'rgba(0,0,0,0)'}} onClick={(e) => close(e)} onContextMenu={(e) => close(e)}>
			<div ref="menu" className="ui vertical menu contextmenu" style={{width: 'auto', minWidth: '100px', backgroundColor: 'floralwhite', top, left}}>
				{children}
			</div>
		</div>
	}
}

function show(props={},children){
	let div = document.createElement('div');
	document.body.appendChild(div);
	document.body.style.overflow = 'hidden';
	
	let component = React.createElement(ContextMenu, {
		...props,
		close: (e) => {
			e && e.preventDefault();
			ReactDOM.unmountComponentAtNode(div);
			document.body.removeChild(div);
			document.body.style.overflow = '';
		}
	}, children);
	ReactDOM.render(component, div);
}

export default { show };