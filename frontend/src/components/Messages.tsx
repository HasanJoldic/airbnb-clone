import React, { Component } from "react";

import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";

import { 
	Grid, 
	Row, 
	Col 
} from 'react-flexbox-grid';

import "./Messages.less";

const Messages: any = ({intl}) => {
	let lastMessage = `text text text text text text text text text text text text text text text text text text
								  text text text text text text text text text text text text text text text text text text
								  text text text text text text text text text text text text text text text text text text
								  text text text text text text text text text text text text text text text text text text
								  text text text text text text text text text text text text text text text text text text
								  text text text text text text text text text text text text text text text text text text`;
	lastMessage = lastMessage.substring(0, 128) + (lastMessage.length > 128 ? "..." : "");
	return (
		<Grid className="Messages">
			<Row>
				<Col lg={10} className="messagesBox">
					<Row className="conversation">
						<Col lg={12}>
							<Row>
								<Col xsOffset={3} xs={3} lgOffset={0} lg={2} className="inboxProfilePicCol">
									<img 
									  className="inboxProfilePic" 
									  src="https://www.billboard.com/files/media/ariana-grande-live-2016-bw-03-billboard-1548.jpg" 
									/>
								</Col>
								<Col xsOffset={3} xs={3} lgOffset={0} lg={2} className="inboxDateTimeCol">
								  time
								</Col>
								<Col xs={12} lg={8} className="inboxMessageCol">
								  {lastMessage}
								</Col>
							</Row>
						</Col>
					</Row>
					<Row className="conversation">
						<Col lg={12}>
							<Row>
								<Col xsOffset={3} xs={3} lgOffset={0} lg={2} className="inboxProfilePicCol">
									<img 
									  className="inboxProfilePic" 
									  src="https://www.billboard.com/files/media/ariana-grande-live-2016-bw-03-billboard-1548.jpg" 
									/>
								</Col>
								<Col xsOffset={3} xs={3} lgOffset={0} lg={2} className="inboxDateTimeCol">
								  time
								</Col>
								<Col xs={12} lg={8} className="inboxMessageCol">
								  {lastMessage}
								</Col>
							</Row>
						</Col>
					</Row>
					<Row className="conversation">
						<Col lg={12}>
							<Row>
								<Col xsOffset={3} xs={3} lgOffset={0} lg={2} className="inboxProfilePicCol">
									<img 
									  className="inboxProfilePic" 
									  src="https://www.billboard.com/files/media/ariana-grande-live-2016-bw-03-billboard-1548.jpg" 
									/>
								</Col>
								<Col xsOffset={3} xs={3} lgOffset={0} lg={2} className="inboxDateTimeCol">
								  time
								</Col>
								<Col xs={12} lg={8} className="inboxMessageCol">
								  {lastMessage}
								</Col>
							</Row>
						</Col>
					</Row>
				</Col>
			</Row>
		</Grid>
	);
};

Messages.propTypes = {
	intl: intlShape.isRequired
};

export default injectIntl(Messages);