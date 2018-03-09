import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageHeader, Search } from '../../../components';
import { fetchWwww } from '../actions';
import { RESET_STATE } from '../actionTypes';
import moment from 'moment';
import Wwww from './wwww';

class Dgdgd extends Component{
	constructor(props) {
		super(props);
		this.state = {
			start: moment().subtract(6, 'days').format('YYYY-MM-DD'),
			end: moment().format('YYYY-MM-DD'),
		}
	}
	componentDidUpdate(prevProps, prevState) {
		const { dispatch, wwww } = this.props;

		if (wwww.success !== '') {
			dispatch({type: RESET_STATE, index: 0})
		}
	}
	handleSearch() {
		const { start, end } = this.state;
		this.refs.group0.handleChange()
	}
	render() {
		const { start, end } = this.state;
		const { dispatch, wwww } = this.props;
		
		return <div>
			<PageHeader size="large">侧导航4</PageHeader>
			<Search
				indicator="使用"
				start={start}
				end={end} 
				handleSearch={() => this.handleSearch()}
				handleDayChange={(start, end) => this.setState({start, end})}
			/>
			<div className="report" style={{marginTop: '2rem', padding: '1rem'}}>
				<Wwww
					start={start}
					end={end}
					ref="group0"
					dispatch={dispatch}
					data={wwww}
					action={fetchWwww}
					style={{marginBottom: '2rem'}}
				/>
			</div>
		</div>
	}
}
const mapStateToProps = state => {
	return {
		wwww: state.wwww,
	}
}

export default connect(mapStateToProps)(Dgdgd);
