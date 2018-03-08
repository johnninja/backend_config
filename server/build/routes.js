const endOfLine = require('os').EOL;
const render = require('json-templater/string');
const uppercamelcase = require('uppercamelcase');
const decamelize = require('decamelize');

module.exports = navigations => {
	const MAIN_CONTENT = `import React from 'react';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import { Login } from './views/login';
import Main from './views/main/components';
{{include}}

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
			{{routes}}
		</Route>
	</Router>
)

export default Routers;`

	const INCLUDE = `import { {{name}} } from "./views/{{path}}";`;
	const TOP_ROUTE = `			<Route path="{{path}}" component={ Container }>
				{{children}}
			</Route>`;

	const INDEX_DIRECT = `<IndexRedirect to="{{path}}" />`;

	let includeTemplate = [];
	let routeTemplate = [];

	navigations.forEach((item,i) => {
		let CHILD_TEMPLATE = `				<Route path="{{path}}" component={ {{name}} }/>`;
		let childTemplate = [];

		item.children.forEach((nav,index) => {
			let nav_path = decamelize(nav.name);
			let nav_name = uppercamelcase(nav.name);
			if (index == 0) {
				childTemplate.push(render(INDEX_DIRECT, {
					path: nav.path,
				}));
				childTemplate.push(render(CHILD_TEMPLATE, {
					path: nav.path,
					name: nav_name
				}));
			}else {
				childTemplate.push(render(CHILD_TEMPLATE, {
					path: nav.path,
					name: nav_name
				}));
			}
			includeTemplate.push(render(INCLUDE,{
				name: nav_name,
				path: nav_path
			}));
		});
		if (i == 0) {
			routeTemplate.push(render(INDEX_DIRECT, {
				path: item.path,
			}));
			routeTemplate.push(render(TOP_ROUTE, {
				path: item.path,
				children: childTemplate.join(endOfLine)
			}));

		}else {
			routeTemplate.push(render(TOP_ROUTE, {
				path: item.path,
				children: childTemplate.join(endOfLine)
			}))
		}
	});

	let template = render(MAIN_CONTENT, {
		include: includeTemplate.join(endOfLine),
		routes: routeTemplate.join(endOfLine)
	});
	return template;
}
