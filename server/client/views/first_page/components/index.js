import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageHeader, Search } from '../../../components';
import { fetchGroupOne, fetchGroupTwo } from '../actions';
import { RESET_STATE } from '../actionTypes';
import moment from 'moment';
import GroupOne from './group_one';
import GroupTwo from './group_two';

class FirstPage extends Component{
	constructor(props) {
		super(props);
		this.state = {
			start: moment().subtract(6, 'days').format('YYYY-MM-DD'),
			end: moment().format('YYYY-MM-DD'),
		}
	}
	componentDidUpdate(prevProps, prevState) {
		const { dispatch, groupOne, groupTwo } = this.props;

		if (groupOne.success !== '') {
			dispatch({type: RESET_STATE, index: 0})
		}
if (groupTwo.success !== '') {
			dispatch({type: RESET_STATE, index: 1})
		}
	}
	handleSearch() {
		const { start, end } = this.state;
		this.refs.group0.handleChange()
this.refs.group1.handleChange()
	}
	render() {
		const { start, end } = this.state;
		const { dispatch, groupOne, groupTwo } = this.props;
		
		return <div>
			<PageHeader size="large">测试标题</PageHeader>
			<Search
				indicator="使用"
				start={start}
				end={end} 
				handleSearch={() => this.handleSearch()}
				handleDayChange={(start, end) => this.setState({start, end})}
			/>
			<div className="report" style={{marginTop: '2rem', padding: '1rem'}}>
				<GroupOne
					start={start}
					end={end}
					ref="group0"
					dispatch={dispatch}
					data={groupOne}
					action={fetchGroupOne}
					style={{marginBottom: '2rem'}}
				/>
<GroupTwo
					start={start}
					end={end}
					ref="group1"
					dispatch={dispatch}
					data={groupTwo}
					action={fetchGroupTwo}
					style={{marginBottom: '2rem'}}
				/>
			</div>
		</div>
	}
}
const mapStateToProps = state => {
	return {
		groupOne: state.groupOne,
groupTwo: state.groupTwo,
	}
}

export default connect(mapStateToProps)(FirstPage);
