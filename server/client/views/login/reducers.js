import * as t from './actionTypes';

function login(state={
	logging: false,
	message: '',
	success: ''
},action){
	switch (action.type){
		case t.LOGIN:
			return {
				...state, 
				message: '',
				success: '',
				logging: true
			};
		case t.LOGIN_SUCCESS:
			return {
				...state,
				data: action.data,
				message: action.message,
				success: true,
				logging: false
			};
		case t.LOGIN_FAILED:
			return{
				...state, 
				message: action.message, 
				success: false,
				logging: false
			};
		case t.LOGOUT:
			return {
				...state,
				message: 'log out',
				success: false
			}
		default:
			return state;
	}
}

export default login;
