import React, { Component } from 'react';
import NavItem from './nav-item';
class SubMenu extends Component{
	render(){
		const { menu } = this.props;
		return  <div className="ui dropdown item visible">
			<i className="dropdown icon"></i>{menu.name}
			<div className="menu transition hidden">
				{menu.children.map((item,i) => {
					return <NavItem key={item+i} name={item.name} path={item.path}/>
				})}
			</div>
		</div>
	}
}
class SideMenu extends Component{
	render() {
		const { links } = this.props;
		return <div className="ui sticky fixed top" style={{paddingTop: '3.3rem',maxHeight: '100vh', zIndex: 1, overflowX: 'visible', overflowY: 'auto'}}>
			<div className="ui secondary vertical pointing menu">
				{links.map((item,index) => {
					if (item.absolute) {
						return <a href={item.path} target='_blank' key={index} className="item">{item.name}</a>
					}
					if (item.children) {
						return <SubMenu menu={item}/>
					}
					return <NavItem key={index} name={item.name} path={item.path}/>
				})}
			</div>
		</div>
	}
}
export default SideMenu;
