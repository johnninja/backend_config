import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Animate from '../animation';
import Button from '../button';
import Loader from '../loader';

class Indicator extends Component{
	constructor(props) {
		super(props);
		this.x = 0;
		this.y = 0;
		this.boxX = 0;
		this.boxY = 0;
		this.movable = false;
	}
	componentDidMount() {
		document.onmouseup = e => this.movable = false;
	}
	componentWillUnmount() {
		document.onmouseup = null;
	}
	getStyle(obj,attr){
		if (obj.currentStyle) {
			return obj.currentStyle[attr];
		}else{
			return window.getComputedStyle(obj,false)[attr];
		}
	}
	handleMouseDown(e){
		let oBox = this.refs.box;
		this.movable = true;
		this.x = e.clientX;
		this.y = e.clientY;
		oBox.style.transition = 'none';
		let transform = this.getStyle(oBox,'transform').match(/(-)?\d+/g).slice(4);
		this.boxX = parseInt(transform[0]);
		this.boxY = parseInt(transform[1]);
	}
	handleMouseMove(e){
		if (!this.movable) return;

		let oBox = this.refs.box;
		let curX = e.clientX;
		let curY = e.clientY;
		let deltaX = curX - this.x;
		let deltaY = curY - this.y;

		oBox.style.transform = `matrix( 1, 0, 0, 1, ${this.boxX+deltaX}, ${this.boxY+deltaY})`;
	}
	render() {
		const { data, loading } = this.props;
		return <Animate 
				ref={ref => this.dom = ref}
				type="slideTop"
				initialStyle={{
					transform: 'translateY(-100px)',
					opacity: 0,
					transition: 'all .3s linear'
				}}
				endStyle={{
					transform: 'translateY(0)',
					opacity: 1,
					transition: 'all .3s linear'
				}}
				style={{
					position: 'fixed',
					left: 0,
					top: 0,
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'rgba(0,0,0,.5)',
					zIndex: 9999
				}}
				close={this.props.hide}>
				<div ref="box" style={{position: 'relative', width: '50%', maxHeight: '80%', overflowY: 'scroll', zIndex: 2}} onClick={e => e.stopPropagation()}>
					<div className="ui card" style={{width: '100%'}} >
						<div className="content" 
							onMouseDown={(e) => this.handleMouseDown(e)} 
							onMouseMove={(e) => this.handleMouseMove(e)} style={{cursor: 'move'}}
							>
							 <i className="right floated icon close" style={{cursor: 'pointer'}} onClick={() => this.props.hide()}></i>
							<div className="header">指标说明</div>
						</div>
						<div className="content">
							<table className="ui table celled">
								<thead>
									<tr>
										<th>指标名称</th>
										<th>指标定义</th>
										<th>指标规则</th>
										<th>数据来源</th>
									</tr>
								</thead>
								<tbody>
									{data.map((item,index) => {
										return <tr key={index}>
											<td>{item.dataName}</td>	
											<td>{item.dataDefinition}</td>	
											<td>{item.dataRule}</td>
											<td>{item.dateSource}</td>
										</tr>
									})}
								</tbody>
							</table>
						</div>
						<div className="extra content">
							<Button theme="red" onClick={() => this.props.hide()}>关闭</Button>
						</div>
						{loading && <Loader/>}
					</div>
				</div>
		</Animate>
	}
}
export default Indicator;