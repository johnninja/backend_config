import * as t from './actionTypes';
	export function groupOne(state={
	list: [],
	message: '',
	success: '',
	fetching: false,
},action){
	switch (action.type){
		case t.GET_GROUP_ONE:
			return {
				...state, 
				fetching: true
			};
		case t.GET_GROUP_ONE_SUCCESS:
			return {
				...state,
				list: action.list,
				success: true,
				fetching: false
			};
		case t.GET_GROUP_ONE_FAILED:
			return{
				...state, 
				message: action.message,
				success: false,
				fetching: false
			};
		case t.RESET_STATE:
			if (action.index != 0) {
				return state;
			}
			return {
				...state,
				message: '',
				success: ''
			}
		default:
			return state;
	}
}
export function groupTwo(state={
	list: [],
	message: '',
	success: '',
	fetching: false,
},action){
	switch (action.type){
		case t.GET_GROUP_TWO:
			return {
				...state, 
				fetching: true
			};
		case t.GET_GROUP_TWO_SUCCESS:
			return {
				...state,
				list: action.list,
				success: true,
				fetching: false
			};
		case t.GET_GROUP_TWO_FAILED:
			return{
				...state, 
				message: action.message,
				success: false,
				fetching: false
			};
		case t.RESET_STATE:
			if (action.index != 1) {
				return state;
			}
			return {
				...state,
				message: '',
				success: ''
			}
		default:
			return state;
	}
}
	