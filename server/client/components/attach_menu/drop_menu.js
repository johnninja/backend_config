import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class DropMenu extends Component{
	state = {
		show: false,
		delayShow: false,
		active: '',
		selected: ''
	}
	inside = false;
	timer = null;
	componentDidMount() {
		const { defaultValue, data } = this.props;
		let active = 0;
		data.forEach((item,index) => {
			if (item == defaultValue || item.text == defaultValue) {
				active = index;
			}
		})
		this.setState({
			selected: defaultValue,
			active
		});
		document.addEventListener('click',this.handleDocumentClick.bind(this), true);
	}
	componentWillUnmount() {
		document.removeEventListener('click', this.handleDocumentClick);
	}
	toggleShow(){
		this.setState({
			show: !this.state.show
		});
	}
	handleClick(item,index) {
		const { handleSelect } = this.props;
		let text, value;
		if (typeof item === 'string' || typeof item === 'number') {
			text = value = item;
		}else{
			text = item.text;
			value = item.value;
		}

		this.setState({
			active: index,
			selected: text
		})
		handleSelect && handleSelect(value);
	}
	handleDocumentClick(){
		if (!this.inside) {
			this.setState({
				delayShow: false
			})
			this.timer = setTimeout(() => this.setState({
				show: false
			}), 100);
		}else{
			this.timer = setTimeout(() => this.setState({
				delayShow: true
			}), 10);
			this.setState({
				show: true
			})
		}
	}
	render() {
		const { data } = this.props;
		const { show, delayShow, active, selected } = this.state;
		return <div className={show ? 'ui pointing dropdown link item visible' : 'ui pointing dropdown link item'} onMouseEnter={() => this.inside = true} onMouseOut={() => this.inside = false}>
			<span className="text" onMouseEnter={() => this.inside = true}>{selected}</span>
			<i className="dropdown icon" onMouseEnter={() => this.inside = true}></i>
			<div className={show ? "menu transition visible" : "menu transition hidden"} onMouseEnter={() => this.inside = false} style={delayShow ? styles.menuShow : styles.menuHidden}>
				{data.map((item,index) => {
					return <div className={active === index ? "item active" : "item"} key={index} onClick={() => this.handleClick(item,index)}>
						{typeof item === 'string' ? item : item.text}
					</div>
				})}
			</div>
		</div>
	}
}
const styles = {
	menuHidden: {
		transformOrigin: 'top',
		transform: 'scaleY(0)',
		transition: 'transform 0.1s ease-in'
	},
	menuShow: {
		transformOrigin: 'top',
		transform: 'scaleY(1)',
		transition: 'transform 0.1s ease-in'
	}
}
export default DropMenu;