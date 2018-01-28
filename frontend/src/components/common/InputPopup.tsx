import React, { Component } from "react";

import "./InputPopup.less";

const InputPopup: any = (props) => {
	return (
		<div className="InputPopup">
			{props.children}
		</div>
	);
};

export default InputPopup;