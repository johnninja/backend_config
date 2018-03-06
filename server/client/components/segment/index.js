import React, { Component } from 'react';
import AttachMenu from '../attach_menu';

class Segment extends Component{
	constructor(props) {
		super(props);
		this.state = {
			dateType: 'days'
		}
	}
	static defaultProps = {
		column: 'one'
	}
	
	componentDidMount() {
		// const { dateType } = this.state;
		const { dateType } = this.props;
		this.setState({
			dateType: dateType || this.state.dateType
		})
		// const { handleChange } = this.props;
		// handleChange && handleChange(dateType);
	}
	handleClick(val) {
		const { handleChange } = this.props;
		this.setState({
			dateType: val
		});
		handleChange && handleChange(val);
	}
	render() {
		const { title, children, menus, column, selectMenus, selectDefault, handleSelect, tabIndex, style, useSearch, getInput } = this.props;
		return <div className={`ui ${column} column grid stackable`}>
			<AttachMenu 
				title={title}
				menus={menus}
				getInput={input => getInput && getInput(input)}
				useSearch={useSearch}
				tabIndex={tabIndex || 0}
				selectMenus={selectMenus}
				selectDefault={selectDefault}
				handleSelect={handleSelect}
				handleClick={(val) => this.handleClick(val)}
			>{this.props.attachChildren}</AttachMenu>
			<div className="row ui segment attached bottom">
				{React.Children.map(children, (child) => {
					return <div className="column" style={{height: '600px', ...style, ...child.props.childStyle}}>{child}</div>
				})}
			</div>
		</div>
	}
}

export default Segment;