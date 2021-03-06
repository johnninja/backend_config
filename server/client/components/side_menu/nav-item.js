import React, { Component } from 'react';
import { Link } from 'react-router';

class NavItem extends Component{
	render() {
		const { active, path, icon, name } = this.props;
		return <Link className="item" activeClassName="active" to={path}>
            {icon ? <i className={`icon ${icon}`} style={{marginRight:".5rem"}}></i> : null}
            {name}
        </Link>
	}
}
export default NavItem;