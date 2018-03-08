import fetch from 'isomorphic-fetch';
import * as t from './actionTypes';
import { RPT_APP_BASIC_API } from '../API';
import { Alert } from '../../components';

function getWwww(){
	return {
		type: t.GET_WWWW
	}
}
function getWwwwSuccess(payload){
	return {
		type: t.GET_WWWW_SUCCESS,
		list: payload
	}
}

function getWwwwFailed(message){
	return {
		type: t.GET_WWWW_FAILED,
		message
	}
}

export function fetchWwww(start, end, dateType='days'){
	return (dispatch, getState) => {
		dispatch(getWwww());
		return fetch('{{ api }}&BoxFishAccessToken=${localStorage.accessToken}')
		.then(res => res.json())
		.then(json => {
			dispatch(getWwwwSuccess(json));
		})
		.catch((err) => {
			Alert.alert({message: err.toString(), type: 'error',  wait: 2000});
			dispatch(getWwwwFailed(err.toString()));
		})
	}
};
