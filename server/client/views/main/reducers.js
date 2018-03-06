import * as t from './actionTypes';

export function authCodes(state={
	fetching: false,
	codes:[]
}, action){
	switch(action.type){
		case t.GET_AUTH_CODE:
			return {
				...state,
				fetching: true
			}
		case t.GET_AUTH_CODE_SUCCESS:
		case t.GET_AUTH_CODE_FAILED:
			return {
				...state,
				message: action.message,
				codes: action.codes,
				fetching: false
			}
		default:
			return state;
	}
}

export function orgNameList(state={
	fetching: false,
	list:[]
}, action){
	switch(action.type){
		case t.GET_ORG_NAME_LIST:
			return {
				...state,
				fetching: true
			}
		case t.GET_ORG_NAME_LIST_SUCCESS:
			return {
				...state,
				list: action.list,
				fetching: false
			}
		case t.GET_ORG_NAME_LIST_FAILED:
			return {
				...state,
				message: action.message,
				fetching: false
			}
		default:
			return state;
	}
}

export function orgSubNameList(state={
	fetching: false,
	list:[]
}, action){
	switch(action.type){
		case t.GET_SUB_ORG_NAME_LIST:
			return {
				...state,
				fetching: true
			}
		case t.GET_SUB_ORG_NAME_LIST_SUCCESS:
			return {
				...state,
				list: action.list,
				fetching: false
			}
		case t.GET_SUB_ORG_NAME_LIST_FAILED:
			return {
				...state,
				message: action.message,
				fetching: false
			}
		default:
			return state;
	}
}
