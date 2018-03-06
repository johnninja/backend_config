import React, { Component } from 'react';
import NavItem from './nav-item';

class SideMenu extends Component{
	render() {
		const { links } = this.props;
		return <div className="ui sticky fixed top" style={{marginTop: '4.5rem'}}>
			<div className="ui secondary vertical pointing menu">
				{links.map((item,index) => <NavItem key={index} name={item.name} path={item.path}/>)}
			</div>
		</div>
	}
}
export { default as NavItem } from './nav-item';
export default SideMenu;