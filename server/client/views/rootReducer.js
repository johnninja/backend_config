import { combineReducers } from 'redux';
import login from './login';
import auth from './auth';
import mainReducer from './main';


const { authCodes, orgNameList, orgSubNameList } = mainReducer;


const rootReducer = combineReducers({
	login,
	auth,
	authCodes,
	orgNameList,
	orgSubNameList
});

export default rootReducer;
