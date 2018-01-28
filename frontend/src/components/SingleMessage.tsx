import React, { Component } from "react";

import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";

import moment from "moment";

import { 
	Button,
	FormControl
} from 'react-bootstrap';

import { 
	Grid, 
	Row, 
	Col 
} from 'react-flexbox-grid';

import "./SingleMessage.less";

const SingleMessage: any = (props) => {
	const { imgSrc, dateTime, message, theme, isForm } = props;
	let date = dateTime ? moment(1514071000000).format("DD.MM.YYYY HH:mm:ss") : null;
	return (
		<Grid className={"SingleMessage " + theme} >
			<Row>
				<Col lg={10} className="messageBox">
					<Row className="text">
						<Col lg={12}>
							{isForm ? 
								<form id="usrform">
	  							<textarea rows={4} name="comment" form="usrform">
									</textarea>
								</form> : message}
						</Col>
					</Row>
					{date ? <Row className="date">
						<Col lg={12}>
							{date}
						</Col>
					</Row> : null}
					{isForm ? 
						<Row className="singleMessageForm"><Col lg={12}>
							<Button className="pull-right">Send</Button>
						</Col></Row> : null}
					<div className="triangle">
						<div className="left">
						</div>
						<div className="top">
						</div>
						<div className="bottom">
						</div>
						<div className="bottomCover">
						</div>
						<div className="bottomCoverCover">
						</div>
					</div>
					<img src={imgSrc} />
				</Col>
			</Row>
		</Grid>
	);
};

export default SingleMessage;