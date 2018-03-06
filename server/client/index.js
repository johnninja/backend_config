import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Store, createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import fetch from 'isomorphic-fetch';
import { LOGIN_API } from './views/API';

import Router from './routes';
import rootReducer from './views/rootReducer';
import './less/index.less';

let initialState = window.__INITIAL_STATE__ || {};
const rootDom = document.getElementById('root');
const enhancer = compose(applyMiddleware(thunk));
const store = createStore(rootReducer, initialState, enhancer);

let token = localStorage.getItem('accessToken');

async function isLogin() {
	if (token) {
		await fetch(`${LOGIN_API}/box/fish/access/token/query/user?accessToken=${token}`)
		.then(res => res.json())
		.then(json => {
			if (json.code == 0) {
				store.dispatch({type: 'LOGIN_SUCCESS', data: json, message: '已经登录'})
			}
		});
	}
	ReactDOM.render(
		<Provider store={ store }>
			{ Router(store) }
		</Provider>,
		rootDom
	);
}
isLogin();
































