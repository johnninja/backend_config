import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import jsSHA from 'jssha';
import { connect } from 'react-redux';
import { Input, Button, Alert, Chart } from '../../../components';
import { fetchLogin } from '../actions';
import { RESET_MESSAGE } from '../actionTypes';

class Login extends Component{
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		}
	}
	handleSubmit() {
		const { dispatch } = this.props;
		let systemName = 'DataTeamUI',
			username = this.state.username,
			password = this.state.password;

		let signature = new jsSHA('SHA-256', 'TEXT');
		signature.update((systemName+username+password));
		let hash = signature.getHash("HEX");

		let newForm = new FormData();
		
		newForm.append('systemName', systemName);
		newForm.append('username', username);
		newForm.append('password', password);
		newForm.append('signature', hash);

		if (!username || !password) return;

		dispatch(fetchLogin(newForm));
	}
	render() {
		const { login } = this.props;
		return <div className="ui card" style={{margin: '150px auto 0'}}>
			<div className="content">
				<div className="logo">
					<img style={{width: '100%', marginBottom: '1rem'}} src="images/boxfish_title.jpg" alt=""/>
				</div>
				<Input
					placeholder="用户名"
					handleChange={val => this.setState({username: val})}
					style={{width: '100%', marginBottom: '1rem'}}
				/>
				<Input
					type="password"
					placeholder="密码"
					style={{width: '100%', marginBottom: '1rem'}}
					handleChange={val => this.setState({password: val})}
				/>
				<Button 
					theme="primary" 
					block={true}
					loading={login.logging}
					onClick={(e) => this.handleSubmit()}>登录</Button>
			</div>
			{login.message && <div className={login.success ? "ui message success" : "ui message error"}>
				{login.message}
			</div>}
		</div>
	}
}
const mapStateToProps = state => {
	return {
		login: state.login,
		auth: state.auth,
	}
}

export default connect(mapStateToProps)(Login);
