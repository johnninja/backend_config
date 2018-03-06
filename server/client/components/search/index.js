import React, { Component } from 'react';
import InputDayPicker from '../day-picker';
import Button from '../button';
import Indicator from './indicator';
import fetch from 'isomorphic-fetch';
import moment from 'moment';

class Search extends Component{
	state = {
		start: '',
		end: '',
		show: false,
		data: [],
		loading: false
	}
	static defaultProps = {
		start: '',
		end: ''
	}
	componentDidMount() {
		const { start, end } = this.props;
		this.setState({
			start: start,
			end: end
		})
	}
	handleSearch() {
		let { start, end } = this.state;
		const { handleSearch } = this.props;
		// if (moment(end).milliseconds() > moment('2017-09-30').milliseconds()) {
		// 	end = moment('2017-09-30').milliseconds();
		// }
		
		handleSearch && handleSearch(start, end);
	}
	handleDayChange(start, end){
		const { handleDayChange } = this.props;
		this.setState({
			start,
			end
		});
		handleDayChange && handleDayChange(start, end);
	}
	fetchIndicator(){
		const { indicator } = this.props;
		this.setState({
			show: true,
			loading: true
		});
		fetch(`http://192.168.1.25:8687/api/rules?dataType=${indicator}&sort=showid&size=2000&BoxFishAccessToken=${localStorage.accessToken}`)
		.then(res => res.json())
		.then(json => {
			this.setState({
				data: json.content,
				loading: false
			});
		})
		.catch(err => {
			this.setState({
				loading: false
			});
			alert(err);
		});
	}
	render() {
		const { start, end, show, data, loading } = this.state;
		const { disabledStartDays, disabledEndDays, showLabel, startLabelText, endLabelText } = this.props;
		return <div className="ui form message">
			<div className="ui input" style={{marginRight: '1rem', verticalAlign: 'middle'}}>
				{showLabel && <label className="ui label" style={{display: 'flex',alignItems: 'center'}}>
					<span>{startLabelText || '开始时间'}</span>
				</label>}
				<InputDayPicker 
					placeholder="开始时间"
					selectedDay={start}
					disabledDays={disabledStartDays || {}}
					handleChange={start => this.handleDayChange(start, end)}/>
			</div>
			<div className="ui input" style={{marginRight: '1rem', verticalAlign: 'middle', display: this.props.onlyOne ? 'none' : ''}}>
				{showLabel && <label className="ui label" style={{display: 'flex',alignItems: 'center'}}>
					<span>{endLabelText || '结束时间'}</span>
				</label>}
				<InputDayPicker 
					placeholder="结束时间"
					selectedDay={end}
					disabledDays={disabledEndDays || {}}
					handleChange={end => this.handleDayChange(start, end)}/>
			</div>
			<div className="ui input" style={{ verticalAlign: 'middle'}}>
				<Button theme="primary" onClick={() => this.handleSearch()}>搜索</Button>
				{this.props.indicator && <Button theme="teal" onClick={() => this.fetchIndicator()}>指标说明</Button>}
			</div>
			{this.props.children}
			{show && <Indicator data={data} loading={loading} hide={() => this.setState({show: false})}/>}
		</div>
	}
}
export default Search;