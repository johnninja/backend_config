// import fetch from 'isomorphic-fetch';
import * as t from './actionTypes';
import { LOGIN_API, DICT_API } from '../API';
import { Alert } from '../../components';

function getAuthCode(){
	return {
		type: t.GET_AUTH_CODE
	}
}
function getAuthCodeSuccess(data){
	return {
		type: t.GET_AUTH_CODE_SUCCESS,
		message: data.message,
		codes: data.data
	}
}
function getAuthCodeFailed(data){
	return {
		type: t.GET_AUTH_CODE_FAILED,
		message: data.message,
		codes:[]
	}
}

function getOrgName(){
	return {
		type: t.GET_ORG_NAME_LIST
	}
}
function getOrgNameSuccess(data){
	return {
		type: t.GET_ORG_NAME_LIST_SUCCESS,
		list: data || []
	}
}
function getOrgNameFailed(data){
	return {
		type: t.GET_ORG_NAME_LIST_FAILED,
		message: data.message,
	}
}

function getSubOrgName(){
	return {
		type: t.GET_SUB_ORG_NAME_LIST
	}
}
function getSubOrgNameSuccess(data){
	return {
		type: t.GET_SUB_ORG_NAME_LIST_SUCCESS,
		list: data || []
	}
}
function getSubOrgNameFailed(data){
	return {
		type: t.GET_SUB_ORG_NAME_LIST_FAILED,
		message: data.message,
	}
}

export function fetchAuthCode(){
	let accessToken = localStorage.getItem('accessToken');
	return dispatch => {
		dispatch(getAuthCode());
		return fetch(`${LOGIN_API}/box/fish/access/token/query/node/code?systemName=DataTeamUI&accessToken=${accessToken}`)
		.then(res => res.json())
		.then(json => {
			if (json.code == 0) {
				dispatch(getAuthCodeSuccess(json));
				return;
			}
			dispatch(getAuthCodeFailed(json));
		})
		.catch(err => {
			dispatch(getAuthCodeFailed({message: err}));
		})
	}
}

export function fetchOrgName(){
	let accessToken = localStorage.getItem('accessToken');
	return dispatch => {
		dispatch(getOrgName());
		return fetch(`${DICT_API}/dict/dict?groupCode=grp_opt_app_org&BoxFishAccessToken=${accessToken}`)
		.then(res => res.json())
		.then(json => {
			let data = json.map(item => {
				return {
					text: item.name,
					value: item.code
				}
			});
			dispatch(getOrgNameSuccess(data));
		})
		.catch(err => {
			Alert.alert({message: err.toString(), type: 'error',  wait: 2000});
			dispatch(getOrgNameFailed({message: err}));
		})
	}
}

export function fetchSubOrgName(){
	let accessToken = localStorage.getItem('accessToken');
	return dispatch => {
		dispatch(getSubOrgName());
		return fetch(`${DICT_API}/dict/dict?groupCode=grp_opt_app_suborg&BoxFishAccessToken=${accessToken}`)
		.then(res => res.json())
		.then(json => {
			let data = json.map(item => {
				return {
					text: item.name,
					value: item.code
				}
			});
			dispatch(getSubOrgNameSuccess(data));
		})
		.catch(err => {
			Alert.alert({message: err.toString(), type: 'error',  wait: 2000});
			dispatch(getSubOrgNameFailed({message: err}));
		})
	}
}
