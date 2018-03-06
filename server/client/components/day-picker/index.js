import React, { Component } from 'react';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import LocaleUtils from "react-day-picker/moment";
import 'react-day-picker/lib/style.css';

const overlayStyle = {
  position: 'absolute',
  background: 'white',
  boxShadow: '0 2px 5px rgba(0, 0, 0, .15)',
};

class InputDayPicker extends Component{
	constructor(props) {
		super(props);
		this.state = {
			showOverlay: false,
			value: '',
			selectedDay: null
		};
	}
	componentDidUpdate(prevProps, prevState) {
		this.renderDays();
	}
	componentDidMount() {
		this.renderDays();
	}
	renderDays() {
		const { selectedDay } = this.props;
		const dateObj = moment(selectedDay, 'YYYY-MM-DD', true);
		if (!dateObj.isValid()) return;
		this.setState({
			selectedDay: dateObj.toDate() || null,
			value: selectedDay || ''
		});
	}
	shouldComponentUpdate(nextProps, nextState) {
		if (nextState.start !== this.state.start || 
			nextState.end !== this.state.end || 
			this.props.selectedDay === '' ||
			nextState.showOverlay !== this.state.showOverlay ||
			nextState.value !== this.state.value
		) {
			return true;
		}
		return false;
	}
	componentWillUnmount() {
	    clearTimeout(this.clickTimeout);
	}

	daypicker = null;
	input = null;
	clickedInside = false;
	clickTimeout = null;

	handleContainerMouseDown = () => {
	    this.clickedInside = true;
	    // The input's onBlur method is called from a queue right after onMouseDown event.
	    // setTimeout adds another callback in the queue, but is called later than onBlur event
	    this.clickTimeout = setTimeout(() => {
	      this.clickedInside = false;
	    }, 0);
	};
	handleInputFocus = () => {
	    this.setState({
	      showOverlay: true,
	    });
	};
	handleInputBlur = () => {
	    const showOverlay = this.clickedInside;
	    this.setState({
	      showOverlay,
	    });
	    // Force input's focus if blur event was caused by clicking on the calendar
	    if (showOverlay) {
	      this.input.focus();
	    }
	};
	handleInputChange = e => {
		const { value } = e.target;
	    const momentDay = moment(value, 'YYYY-MM-DD', true);
	    if (momentDay.isValid()) {
	      this.setState(
	        {
	          selectedDay: momentDay.toDate(),
	          value,
	        },
	        () => {
	          this.daypicker.showMonth(this.state.selectedDay);
	        }
	      );
	    } else {
	      this.setState({ value, selectedDay: null });
	    }
	};
	handleDayClick(day, {disabled, selected}) {
		if (disabled) {
			return;
		}
		const { handleChange } = this.props;
	    this.setState({
	      value: moment(day).format('YYYY-MM-DD'),
	      selectedDay: day,
	      showOverlay: false,
	    });
	    if (handleChange) {
	    	handleChange(moment(day).format('YYYY-MM-DD'))
	    }
	    this.input.blur();
	};
	render() {
		const { placeholder, disabledDays } = this.props;
		
		return <div onMouseDown={() => this.handleContainerMouseDown()}>
			<input type="text"
				ref={el => this.input = el}
				placeholder={placeholder || 'YYYY-MM-DD'}
				value={this.state.value}
				readOnly={true}
		        onFocus={this.handleInputFocus}
		        onBlur={this.handleInputBlur}
				onChange={e => this.handleInputChange(e)}/>
			{this.state.showOverlay && 
			<div style={{position: 'relative', zIndex: 1}}>
				<div style={overlayStyle}>
					<DayPicker
						ref={el => this.daypicker = el}
						initialMonth={this.state.selectedDay || undefined}
		                onDayClick={(day, {disabled, selected}) => this.handleDayClick(day,{disabled, selected})}
		                selectedDays={this.state.selectedDay}
		                disabledDays={disabledDays || null}
		                locale="zh-cn"
		                localeUtils={LocaleUtils}
					/>
				</div>
			</div>}
		</div>
	}
}
export default InputDayPicker;