import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import echarts from 'echarts/lib/echarts';
import ContextMenu from './contextmenu';
import { Alert, Loader } from '../index';

require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');

require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/grid');
require('echarts/lib/component/legend');
require('echarts/lib/component/dataZoom');
require('echarts/lib/component/markLine');
require('echarts/lib/component/toolbox');

class Chart extends Component{
	constructor(props) {
		super(props);
		this.chart = null;
		this.timer = null;
		this.state={
			loading: false
		}
	}
	static defaultProps = {
		option: {}
	}
	componentWillReceiveProps(nextProps, nextState) {
		const { loading } = nextProps;

		if (loading) {
			this.chart.showLoading('加载中...')
		}else{
			this.chart.hideLoading();
		}
	}
	componentDidMount() {
		const { option, getInstance, loading, handleClick } = this.props;
		const chart = this.refs.chart;
		this.chart = echarts.init(chart);
		this.chart.setOption(option);
		if (getInstance) {
			getInstance(this.chart);
		}

		window.addEventListener('resize', (e) => this.handleResize(e), false);
	}
	handleResize(e){
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			this.chart.resize();
		}, 300);
	}
	handleOnContextMenu(e){
		const { contextMenus, hideContextMenu } = this.props;

		if (hideContextMenu) {
			return;
		}

		e.preventDefault();

		ContextMenu.show({event: e},contextMenus || <a className="item" onClick={e => this.handleAdd(e)}>添加至首页<i className="icon add circle"></i></a>);
	}
	handleAdd(e){
		e.preventDefault();
		const { chartName } = this.props;
		const username = localStorage.username;
		if (!chartName || !username) {
			Alert.alert({message: "该图暂不支持添加到首页", type: 'warning', wait: 2000});
			return;
		}
		this.forceUpdate();
		this.setState({loading: true});
		fetch(`http://192.168.1.25:8687/api/dashboard?userAccount=${username}&dashboard=${chartName}&BoxFishAccessToken=${localStorage.accessToken}`,{
			method: 'POST'
		})
		.then(res => res.json())
		.then(json => {
			Alert.alert({message: '添加成功！', type: 'success', wait: 2000});
			this.setState({loading: false});
			this.forceUpdate()
		})
		.catch(err => {
			Alert.alert({message: err.toString(), type: 'error', wait: 2000});
			this.setState({loading: false});
			this.forceUpdate()
		});
	}
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.id !== this.props.id;
	}
	componentDidUpdate(prevProps, prevState) {
		const { option } = this.props;
		this.chart.clear();		//处理面积图时动画效果bug
		this.chart.setOption(option);
	}
	componentWillUnmount() {
		clearTimeout(this.timer);
		window.removeEventListener('resize', this.handleResize);
	}
	render() {
		return <div style={{width: '100%', height: '100%'}} ref="chart" onContextMenu={e => this.handleOnContextMenu(e)}>
			{this.state.loading && <Loader text="请求处理中..."/>}
		</div>
	}
}

export default Chart;