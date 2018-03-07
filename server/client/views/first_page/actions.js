import fetch from 'isomorphic-fetch';
import * as t from './actionTypes';
import { RPT_APP_BASIC_API } from '../API';
import { Alert } from '../../components';

function getGroupOne(){
	return {
		type: t.GET_GROUP_ONE
	}
}
function getGroupOneSuccess(payload){
	return {
		type: t.GET_GROUP_ONE_SUCCESS,
		list: payload
	}
}

function getGroupOneFailed(message){
	return {
		type: t.GET_GROUP_ONE_FAILED,
		message
	}
}
function getGroupTwo(){
	return {
		type: t.GET_GROUP_TWO
	}
}
function getGroupTwoSuccess(payload){
	return {
		type: t.GET_GROUP_TWO_SUCCESS,
		list: payload
	}
}

function getGroupTwoFailed(message){
	return {
		type: t.GET_GROUP_TWO_FAILED,
		message
	}
}

export function fetchGroupOne(start, end, dateType='days'){
	return (dispatch, getState) => {
		dispatch(getGroupOne());
		return fetch('{{ api }}&BoxFishAccessToken=${localStorage.accessToken}')
		.then(res => res.json())
		.then(json => {
			dispatch(getGroupOneSuccess(json));
		})
		.catch((err) => {
			Alert.alert({message: err.toString(), type: 'error',  wait: 2000});
			dispatch(getGroupOneFailed(err.toString()));
		})
	}
};
export function fetchGroupTwo(start, end, dateType='days'){
	return (dispatch, getState) => {
		dispatch(getGroupTwo());
		return fetch('{{ api }}&BoxFishAccessToken=${localStorage.accessToken}')
		.then(res => res.json())
		.then(json => {
			dispatch(getGroupTwoSuccess(json));
		})
		.catch((err) => {
			Alert.alert({message: err.toString(), type: 'error',  wait: 2000});
			dispatch(getGroupTwoFailed(err.toString()));
		})
	}
};
