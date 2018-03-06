import React, { Component } from 'react';
import DropMenu from './drop_menu';
import InputDropDown from './input-dropdown';
class AttachMenu extends Component{
	state = {
		tabIndex: 0
	}
	static defaultProps = {
		position: 'top',
		title: '',
		menus: [],
	}
	componentDidMount() {
		this.setState({
			tabIndex: this.props.tabIndex || 0
		})
	}
	handleClick(index, value) {
		this.setState({
			tabIndex: index
		})

		this.props.handleClick && this.props.handleClick(value)
	}
	render() {
		const { position, title, menus, selectMenus, selectDefault,handleSelect, useSearch, getInput } = this.props;
		const { tabIndex, showSelect } = this.state;

		return <div className={`ui ${position} attached menu`}>
			{title && <a className="item">{title}</a>}
			{menus.map((item,index) => {
				return typeof item == 'string' ? 
				<a className={`item ${tabIndex == index ? 'active' : ''}`} onClick={() => this.handleClick(index, item)} key={index}>{item}</a> : 
				<a className={`item ${tabIndex == index ? 'active' : ''}`}  onClick={() => this.handleClick(index, item.value)} key={index}>{item.text}</a>
			})}
			{!useSearch && selectMenus && selectMenus.length > 0 && <DropMenu
				data={selectMenus}
				defaultValue={selectDefault}
				handleSelect={handleSelect}
			/>}
			{useSearch && selectMenus && selectMenus.length > 0 &&<InputDropDown
				ref={input => getInput && getInput(input)}
				data={selectMenus}
				defaultValue={selectDefault}
				handleSelect={handleSelect}
			/>}
			{this.props.children}
		</div>
	}
}
export default AttachMenu;