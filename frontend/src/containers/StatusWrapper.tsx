import React, { Component } from "react";

import { connect } from "react-redux";

import { 
	Grid, 
	Row, 
	Col 
} from 'react-flexbox-grid';

import "./StatusWrapper.less";

import Spinner from "../components/Spinner";

class StatusWrapper extends Component<any, any> {

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="StatusWrapper">
				{this.props.children}
				{this.props.isLoading ? <Spinner /> : null }
			</div>
		);
	}
};

const mapStateToProps = state => {
  return {
    isLoading: state.app.isLoading,
    isError: state.app.isError,
    errorMessage: state.app.errorMessage
  };
};

export default connect(mapStateToProps)(StatusWrapper);