import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component{
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}
	handleChange(e){
		const { handleChange } = this.props;
		this.setState({
			value: e.target.value
		});
		handleChange(e.target.value);
	}
	render() {
		const { type, placeholder, defaultValue, style, disabled } = this.props;
		return <div className="ui input" style={{...style}}>
			<input 
				type={type}
				placeholder={placeholder}
				defaultValue={defaultValue}
				disabled={disabled}
				onChange={e => this.handleChange(e)}
				{...this.props}/>
		</div>
	}
}
Input.defaultProps = {
	type: 'text',
	placeholder: ''
}
Input.propTypes = {
	type: PropTypes.oneOf(['text','password']),
	placeholder: PropTypes.string,
	defaultValue: PropTypes.oneOfType(['string', 'number']),
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
	style: PropTypes.object,
	disabled: PropTypes.bool
}

export default Input;