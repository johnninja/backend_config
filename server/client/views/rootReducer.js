import { combineReducers } from 'redux';
import login from './login';
import auth from './auth';
import mainReducer from './main';
import dgdgdReducer from './dgdgd';


const { authCodes, orgNameList, orgSubNameList } = mainReducer;
const { wwww } = dgdgdReducer;

const rootReducer = combineReducers({
	login,
	auth,
	authCodes,
	orgNameList,
	orgSubNameList,
	wwww
});

export default rootReducer;