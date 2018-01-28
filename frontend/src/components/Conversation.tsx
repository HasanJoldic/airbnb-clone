import React, { Component } from "react";

import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";

import { 
	Grid, 
	Row, 
	Col 
} from 'react-flexbox-grid';

import "./Conversation.less";

import SingleMessage from "./SingleMessage";

const Conversation: any = ({intl}) => {
	return (
		<Grid className="Conversation">
			<Row>
				<Col lg={3}>
				as
				</Col>
				<Col lgOffset={1} lg={8} className="messagesBox">
					<SingleMessage 
						theme="dark"
						imgSrc="https://www.billboard.com/files/media/ariana-grande-live-2016-bw-03-billboard-1548.jpg"
						message={`text text text text text text text text text text text text text text text text text text
									  text text text text text text text text text text text text text text text text text text
									  text text text text text text text text text text text text text text text text text text
									  text text text text text text text text text text text text text text text text text text`}
						dateTime={Date.now()}
					/>
				</Col>
			</Row>
		</Grid>
	);
};

Conversation.propTypes = {
	intl: intlShape.isRequired
};

export default injectIntl(Conversation);