import * as t from './actionTypes';

function auth(state={
	logged: false,
	message: '',
	success: ''
},action){
	switch (action.type){
		case t.GET_AUTH:
			return {
				...state,
				logged: '', 
				message: ''
			};
		case t.GET_AUTH_SUCCESS:
			return {
				...state,
				logged: true,
			};
		case t.GET_AUTH_FAILED:
			return{
				...state, 
				message: action.message, 
				logged: false
			};
		default:
			return state;
	}
}

export default auth;
