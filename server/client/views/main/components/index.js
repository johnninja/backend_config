import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import TopNav from './top-nav';
import SideMenu from './side-menu';
import { fetchAuthCode, fetchOrgName, fetchSubOrgName } from '../actions';
import { Loader, Transition } from '../../../components';
import { LOGOUT } from '../actionTypes';
import navConfig from './nav.config';

const topNav = [
	{name:'使用', path: '/used', children: navConfig.used},
	{name:'付费', path: '/payment', children: navConfig.payment},
	{name:'上课', path: '/course', children: navConfig.course},
	{name:'学习', path: '/study', children: navConfig.study},
	{name:'幼儿园', path: '/kindergarten', children: navConfig.kindergarten},
	{name:'销售管理', path: '/sales', children: navConfig.sales},
	{name:'用户资产', path: '/assets', children: navConfig.assets},
	{name:'销售活动', path: '/eleven', children: navConfig.eleven},
	{name:'学校管理', path: '/school', children: navConfig.school},
	{name:'渠道推广', path: '/extend', children: navConfig.extend},
	{name:'环节监控', path: '/monitor', children: navConfig.monitor},
	{name:'推送管理', path: '/push', children: navConfig.push},
	{name:'月度监控', path: '/months', children: navConfig.months},
];

class Main extends Component{
	constructor(props) {
		super(props);
		this.state = {
			opacity: 0
		};
	}
	componentWillReceiveProps(nextProps) {
		const { location } = this.props;
		if (nextProps.location.pathname != location.pathname) {
			this.setState({
				opacity: 0
			});
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.opacity !== this.state.opacity) {
			this.setState({
				opacity: 1
			});
		}
	}
	componentDidMount() {
		const { dispatch, auth } = this.props;
		dispatch(fetchAuthCode());
		dispatch(fetchOrgName());
		dispatch(fetchSubOrgName());
		this.setState({
			opacity: 1
		});
	}
	handleLogout(){
		const { dispatch } = this.props;
		dispatch({type: LOGOUT});
		localStorage.clear();
		window.location.hash="#/login";
	}
	render() {
		const { location, authCodes } = this.props;
		const path = location.pathname;
		let matched = path.match(/\w+/i) || 'used';
		let matchedNav = navConfig[matched] || [];
		let filterNav = matchedNav.filter(item => authCodes.codes.includes(item.node));
		let cur = filterNav.filter(item => item.path == path);
		
		if (cur.length == 0) {
			filterNav.forEach(item => {
				if (item.children) {
					cur = item.children.filter(sub => sub.path == path)
				}
			})
		}

		return <div id="content">
			<TopNav links={topNav} codes={authCodes.codes} handleLogout={() => this.handleLogout()}/>
			{matched == "dashboard" ? null : <SideMenu links={filterNav || []}/>}
			<div className="container" 
				style={
					matched == "dashboard" ? {...styles.dashboard, opacity: this.state.opacity, transition: this.state.opacity == 0 ? 'none' : 'opacity 0.5s linear 0.2s'} : {...styles.container, opacity: this.state.opacity, transition: this.state.opacity == 0 ? 'none' : 'opacity 0.5s linear 0.2s'}}>
				{authCodes.codes.includes(cur[0] && cur[0].node) || (matched == "dashboard" && authCodes.codes.includes('report_dashboard')) ? this.props.children : <div>暂无权限</div>}
			</div>
			{authCodes.fetching && <Loader text="正在验证权限..."/>}
		</div>
	}
}
const styles = {
	container: {
		marginLeft: '15rem', 
		marginTop: '3.5rem', 
		padding: '1rem',
	},
	dashboard: {
		paddingTop: '3.5rem',
		margin: '0 15rem'
	}
}
function mapStateToProps(state){
	return {
		authCodes: state.authCodes,
		auth: state.auth,
		login: state.login
	}
}
export default connect(mapStateToProps)(Main);
