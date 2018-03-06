import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Alert from './alert';

function alert(props={}, type){
	const alerts = document.querySelectorAll('.ui.alert');
	const div = document.createElement('div');
	document.body.appendChild(div);
	let top = 100;
	for (var i = 0; i < alerts.length; i++) {
		top += alerts[i].offsetHeight + 16;
	}

	const component = React.createElement(Alert, {
		...props,
		top,
		onClose: () => {

			ReactDOM.unmountComponentAtNode(div);
			document.body.removeChild(div);

			const instances = document.querySelectorAll('.ui.alert');
			let top = 100;
			for (var i = 0; i < instances.length; i++) {
				instances[i].style.top = top + 'px';
				top += instances[i].offsetHeight + 16;
			}
			
		}
	});
	ReactDOM.render(component, div);
}
export default { alert };