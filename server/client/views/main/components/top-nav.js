import React,{ Component, PropTypes } from 'react';
import { Link } from 'react-router';
import NavItem from './nav-item';
import { Button } from '../../../components';
class TopNav extends Component{
	state = {
		show: false
	}
	static defaultProps = {
		links: []
	}
	static contextTypes = {
		router: PropTypes.object
	}
	handleLogout() {
		const { handleLogout } = this.props;
		handleLogout();
	}
	render() {
		const { links, codes } = this.props;
		return <div className="ui inverted menu">
			<Link className="item" to="/dashboard" style={{width: '15rem',backgroundColor:'#F2711C',borderRadius: 0}}>
				BOXFiSH数据平台
			</Link>
			{links.map((item,index) => {
				let displayNavs = [];
				item.children.forEach(nav => {
					if (codes.indexOf(nav.node) != -1) {
						displayNavs.push(nav);
					}
				});
				return displayNavs.length > 0 ? <NavItem 
					key={index} 
					name={item.title} 
					path={item.path}
					// style={{backgroundColor: item.name == '双十一11・11' ? '#F44336' : null}}
					// icon={item.name == '双十一11・11' ? 'gift' : null}
				/> : null;
			})}
			{/*<div className="ui dropdown icon item" onMouseOver={() => this.setState({show: true})}  onMouseOut={() => this.setState({show: false})}>
				<i className="icon ellipsis horizontal"></i>
				<div className={this.state.show ? "menu transition visible" : "menu transition hidden"} style={{right: 0, left: 'auto'}}>
					<NavItem
						name="幼儿园总览"
						path="/payment/kindergarten"
					/>
					<NavItem
						name="幼儿园使用"
						path="/used/activity"
					/>
					<NavItem
						name="幼儿园学习管理"
						path="/used/activity1"
					/>
				</div>
			</div>*/}
			<div className="right menu">
				<div className="item">
					<Button theme="red" size="mini" onClick={() => this.handleLogout()}>退出</Button>
				</div>
			</div>
		</div>
	}
}

export default TopNav;
