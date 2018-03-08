import React from 'react';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import { Login } from './views/login';
import Main from './views/main/components';
import { Dgdgd } from "./views/dgdgd";

class Container extends React.Component{
	render() {
		return <div>
			{this.props.children}
		</div>
	}
}

const Routers = (store) => (
	<Router history={ hashHistory }>
		<Route path="/login" onEnter={(nextState, replace) => {
			if (store.getState().login.success) {
				replace('/');
			}
		}} component={Login}></Route>
		<Route path="/" onEnter={(nextState, replace) => {
			if (!store.getState().login.success) {
				replace('/login')
			}
		}} component={ Main }>
			<IndexRedirect to="used" />
			<Route path="used" component={ Container }>
				
			</Route>
			<Route path="used" component={ Container }>
				
			</Route>
			<Route path="top" component={ Container }>
				<IndexRedirect to="test" />
				<Route path="test" component={ Dgdgd }/>
			</Route>
		</Route>
	</Router>
)

export default Routers;