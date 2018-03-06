import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { Loader } from '../../../components';
import { fetchAuth } from '../actions';
import { RESET_MESSAGE } from '../actionTypes';

class Auth extends Component{
	componentWillReceiveProps(nextProps) {
		const { auth, location } = nextProps;
		if (auth.logged === true) {
			hashHistory.push('/');
		}
		if(auth.logged === false){
			hashHistory.push('/login');
		}
	}
	componentDidMount() {
		const { dispatch, location, auth } = this.props;
		const token = localStorage.accessToken;
		
		if (auth.logged) {
			hashHistory.push('/');
		}
		if (!token) {
			hashHistory.push('/login');
		}else{
			dispatch(fetchAuth(token));
		}
	}
	render() {
		return  <Loader text="获取权限..."/>
	}
}
const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps)(Auth);
