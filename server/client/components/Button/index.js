import React, { Component } from 'react';
import PropTypes from 'prop-types';
export {default as ButtonGroup} from './button_group';

class Button extends Component{
	static defaultProps = {
		theme: 'primary',
		size: 'normal'
	}
	handleClick(e) {
		const { onClick } = this.props;
		if (onClick) {
			onClick(e);
		}
	}
	render() {
		const { theme, size, disabled, onClick, block, loading } = this.props;
		return <button 
			className={`ui button ${theme} ${size} ${ block ? 'fluid' : ''} ${loading && 'loading'}`}
			onClick={(e) => this.handleClick(e)}>
			{this.props.children}
		</button>
	}
}
Button.propTypes = {
	theme: PropTypes.string,
	size: PropTypes.number,
	disabled: PropTypes.bool,
	loading: PropTypes.bool,
	block: PropTypes.bool,
	onClick: PropTypes.func.isRequired
}
export default Button;
