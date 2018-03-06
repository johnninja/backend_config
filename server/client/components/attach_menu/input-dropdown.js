import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class InputDropDown extends Component{
	state = {
		show: false,
		delayShow: false,
		active: '',
		selected: '',
		oldValue: '',
		selectIndex: 0,
		displayData: []
	}
	timer = null;
	inside = false;
	componentDidMount() {
		const { defaultValue } = this.props;
		this.filter(defaultValue, true);
		document.addEventListener('keydown',this.handleKeyDown.bind(this), true);
	}
	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown);
	}
	handleClick(item,index) {
		const { handleSelect } = this.props;
		let value = this.handleManualChange(item,index);
		handleSelect && handleSelect(value);
	}
	handleManualChange(item,index){
		const { data } = this.props;
		let text, value;
		if (typeof item === 'string' || typeof item === 'number') {
			text = value = item;
		}else{
			text = item.text;
			value = item.value;
		}

		this.setState({
			active: index,
			displayData: data.filter(item => item == text || item.text == text),
			selected: text,
			oldValue: text,
			delayShow: false
		});
		this.inside = false;
		this.timer = setTimeout(() => this.setState({
			show: false
		}), 100);
		return value;
	}
	handleKeyDown(e){
		const { handleSelect } = this.props;
		let { displayData, selectIndex } = this.state;
		const dropmenu = this.refs.dropmenu;
		const selectedMenu = dropmenu ? dropmenu.querySelector('.item.selected') : 0;

		if (this.state.show) {
			if (e.keyCode == 40) {
				//down

				if (selectIndex === displayData.length - 1) {
					selectIndex = -1;
					dropmenu.scrollTop = 0;
				}
				this.setState({
					selectIndex: selectIndex + 1,
					selected: displayData[selectIndex + 1].text || displayData[selectIndex + 1]
				});


				if ((selectedMenu.offsetTop - dropmenu.offsetHeight + selectedMenu.offsetHeight) >= dropmenu.scrollTop) {
					if (selectIndex == -1) {
						dropmenu.scrollTop = 0;
					}else{
						dropmenu.scrollTop += dropmenu.offsetHeight;
					}
				}
				if (dropmenu.scrollTop > selectedMenu.offsetTop) {
					dropmenu.scrollTop = selectedMenu.offsetTop + selectedMenu.offsetHeight;
				}

			}
			if (e.keyCode == 38) {
				//up
				if (selectIndex === 0) {
					selectIndex = displayData.length;
				}
				
				this.setState({
					selectIndex: selectIndex - 1,
					selected: displayData[selectIndex - 1].text || displayData[selectIndex - 1]
				})
				if (dropmenu.scrollTop > selectedMenu.offsetTop - selectedMenu.offsetHeight) {
					if (selectIndex == displayData.length) {
						dropmenu.scrollTop = displayData.length * selectedMenu.offsetHeight - dropmenu.offsetHeight;
					}else{
						dropmenu.scrollTop = selectedMenu.offsetTop - dropmenu.offsetHeight;
					}
				}

			}
			if (e.keyCode == 13 && displayData.length > 0) {
				this.setState({
					selected: displayData[selectIndex].text || displayData[selectIndex],
					oldValue: displayData[selectIndex].text || displayData[selectIndex],
					delayShow: false,
					show: false
				});
				this.refs.input.blur();
				handleSelect && handleSelect(displayData[selectIndex].value || displayData[selectIndex]);
			}
		}
	}
	handleChange(e){
		let value = e.target.value;
		const { data } = this.props;
		let filterData = data.filter(item => {
			let str = typeof item === 'string' ? item : item.text
			return str.toLowerCase().includes(value.toLowerCase());
		});
		this.setState({
			displayData: filterData,
			selected: value,
			selectIndex: 0,
		});
		this.refs.dropmenu.scrollTop = 0;
	}
	filter(target, initial=false){
		const { data } = this.props;
		let active = 0;
		data.forEach((item,index) => {
			if (item == target || item.text == target) {
				active = index;
			}
		});
		
		this.setState({
			selected: initial ? target : '',
			oldValue: target,
			displayData: data,
			active
		});
	}
	handleFocus(){
		const { selected } = this.state;
		this.filter(selected);
		this.timer = setTimeout(() => this.setState({
			delayShow: true
		}), 10);
		this.setState({
			show: true
		})
		this.refs.dropmenu.scrollTop = 0;
	}
	handleBlur(){
		if (this.inside) {
			return;
		};
		this.setState({
			delayShow: false,
			selected: this.state.oldValue,
			selectIndex: 0
		});

		this.timer = setTimeout(() => this.setState({
			show: false
		}), 100);
	}
	render() {
		const { data, inPanel } = this.props;
		const { show, delayShow, active, selected, displayData, selectIndex, oldValue } = this.state;

		return <div 
			className={show ? 'ui pointing dropdown link visible search-dropmenu item' : 'ui pointing dropdown link search-dropmenu item'}
			style={inPanel ? {width: '100%',padding: '0.8rem 0'} : null}>
			<input 
				ref="input"
				className="search" 
				type="text" 
				value={selected} 
				tabIndex="1"
				onFocus={() => this.handleFocus()} 
				onBlur={() => this.handleBlur()} 
				onChange={e => this.handleChange(e)}
				style={inPanel ? {backgroundColor: 'transparent', padding: 0} : null}/>
			<div className="text" style={{opacity: selected === '' ? 1 : 0, color: 'inherit'}}>{oldValue}</div>
			<i className="search icon"></i>
			<div 
				ref="dropmenu" 
				className={show ? "menu transition visible" : "menu transition hidden"} 
				style={delayShow ? styles.menuShow : styles.menuHidden}>
				{displayData.map((item,index) => {
					return <div 
						key={index}
						onMouseEnter={() => this.inside = true} 
						onMouseOut={() => this.inside = false} 
						className={active === index ? (selectIndex === index ? "item active selected" : "item active") : (selectIndex === index ? "item selected" : "item")}
						onClick={() => this.handleClick(item,index)}>
						{typeof item === 'string' ? item : item.text}
					</div>
				})}
				{displayData.length > 0 ? '' : <div className="item nodata">无匹配结果</div>}
			</div>
		</div>
	}
}
const styles = {
	menuHidden: {
		backgroundColor: '#fff',
		transformOrigin: 'top',
		transform: 'scaleY(0)',
		transition: 'transform 0.1s ease-in'
	},
	menuShow: {
		backgroundColor: '#fff',
		transformOrigin: 'top',
		transform: 'scaleY(1)',
		transition: 'transform 0.1s ease-in'
	}
}
export default InputDropDown;