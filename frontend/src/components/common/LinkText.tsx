import React, { Component } from "react";

import "./LinkText.less";

const LinkText: any = (props) => {
	return (
		<span className="linkText" onClick={props.onClick}>
			{props.children}
		</span>
	);
};

export default LinkText;