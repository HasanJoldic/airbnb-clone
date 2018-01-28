import React, { Component } from "react";

import "./Spinner.less";

const Spinner = (props) => {
	return (
		<div className="spinnerContainer">
			<div className="spinner">
				<div className="rect1"></div>
			  <div className="rect2"></div>
			  <div className="rect3"></div>
			  <div className="rect4"></div>
			  <div className="rect5"></div>
			</div>
		</div>
	);
};

export default Spinner;