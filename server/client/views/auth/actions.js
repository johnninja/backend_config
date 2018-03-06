import fetch from 'isomorphic-fetch';
import * as t from './actionTypes';
import { LOGIN_API } from '../API';
import { Alert } from '../../components';
function getAuth(){
	return {
		type: t.GET_AUTH
	}
}
function getAuthSuccess(info){
	return {
		type: t.GET_AUTH_SUCCESS,
		logged: true
	}
}

function getAuthFailed(msg){
	return {
		type: t.GET_AUTH_FAILED,
		logged: false,
		message: msg.message
	}
}

export function fetchAuth(token){
	return (dispatch, getState) => {
		dispatch(getAuth());
		return fetch(`${LOGIN_API}/box/fish/access/token/query/user?accessToken=${token}`)
		.then(res => res.json())
		.then(json => {
			if (json.code !== 0) {
				Alert.alert({message: json.message, type: 'error',  wait: 2000});
				return dispatch(getAuthFailed(json.message));
			}
			dispatch(getAuthSuccess(json));
		})
		.catch((err) => {
			Alert.alert({message: err.toString(), type: 'error',  wait: 2000});
			console.log(err);
		})
	}
};
