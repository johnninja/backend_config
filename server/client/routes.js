import React from 'react';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import { Login } from './views/login';
import Main from './views/main/components';

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
			<Route path="kindergarten" component={ Container }>
			</Route>
			<Route path="payment" component={ Container }>
			</Route>
			<Route path="course" component={ Container }>
			</Route>
			<Route path="sales" component={ Container }>
			</Route>
			<Route path="monitor" component={ Container }>
			</Route>
			<Route path="study" component={ Container }>
			</Route>
			<Route path="push" component={ Container }>
			</Route>
			<Route path="months" component={ Container }>
			</Route>
			<Route path="extend" component={ Container }>
			</Route>
			<Route path="eleven" component={ Container }>
			</Route>
			<Route path="assets" component={ Container }>
			</Route>
			<Route path="school" component={ Container }>
			</Route>
		</Route>
	</Router>
)

export default Routers;