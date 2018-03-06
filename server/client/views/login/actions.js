import fetch from 'isomorphic-fetch';
import * as t from './actionTypes';
import { LOGIN_API } from '../API';
import { Alert } from '../../components';
function login(){
	return {
		type: t.LOGIN
	}
}
function loginSuccess(info){
	return {
		type: t.LOGIN_SUCCESS,
		data: info.data,
		message: info.message
	}
}

function loginFailed(msg){
	return {
		type: t.LOGIN_FAILED,
		message: msg.message
	}
}

export function fetchLogin(newForm){
	return (dispatch, getState) => {
		dispatch(login());
		return fetch(`${LOGIN_API}/box/fish/login`,{
			method: 'POST',
			body: newForm
		})
		.then(res => res.json())
		.then(json => {
			if (json.code !== 0) {
				let msg = {
					code: json.code,
					message: json.message
				};	
				return dispatch(loginFailed(msg));
			}

			localStorage.setItem('accessToken',json.data.accessToken.accessToken);
			localStorage.setItem('username',json.data.userInfo.username);
			localStorage.setItem('invalidTime',json.data.accessToken.invalidTime);
			
			dispatch(loginSuccess(json));
			window.location.hash = "/";
		})
		.catch((err) => {
			Alert.alert({message: err.toString(), type: 'error',  wait: 2000});
			console.log(err);
		})
	}
};
