import * as t from './actionTypes';
	
export function wwww(state={
	list: [],
	message: '',
	success: '',
	fetching: false,
},action){
	switch (action.type){
		case t.GET_WWWW:
			return {
				...state, 
				fetching: true
			};
		case t.GET_WWWW_SUCCESS:
			return {
				...state,
				list: action.list,
				success: true,
				fetching: false
			};
		case t.GET_WWWW_FAILED:
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
	