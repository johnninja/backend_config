import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PropTypes from 'prop-types';

export default class Transition extends Component{
	render() {
		return React.createElement(ReactCSSTransitionGroup, {
			transitionName: this.props.name,
			transitionEnterTimeout: Number(this.props.duration),
			transitionLeaveTimeout: Number(this.props.duration),
			component: this.props.component,
			className: this.props.style
		}, this.props.children);
	}
}
Transition.propTypes = {
	name: PropTypes.string.isRequired
}
Transition.defaultProps = {
	duration: 300
}
