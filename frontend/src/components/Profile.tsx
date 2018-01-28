import React, { Component } from "react";

import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";

import { connect } from "react-redux";

import { 
	FormControl
} from 'react-bootstrap';

import { 
	Grid, 
	Row, 
	Col 
} from 'react-flexbox-grid';

import Img from "react-image";
import Carousel from "./Carousel";

import "./Profile.less";

import { loadGirlData } from "../reducers/girl/actions";

import ImageLoader from "./ImageLoader";
import SingleMessage from "./SingleMessage";
import ProfileThumbnails from "./ProfileThumbnails";
import RequestAppointment from "./RequestAppointment";

class Profile extends Component<any, any> {
	constructor(props) {
		super(props);
		props.loadGirlData(/*props.match.params.id*/);
	}

	render() {

		return (
			<Grid className="Profile">
			 {this.props.girl ? 
				<div>
				<Row>
					<Col xs={12} lgOffset={4} lg={4} className="profileNameHeader">
						{`${this.props.girl.public_name}, ${this.props.girl.age}, ${this.props.girl.type}`}
					</Col>
				</Row>
				<Row>
					<Col xs={12} lg={4} className="profileMainContent left">
						<Row>
							<Col lg={12} className="">
								Ariana, 23, Student
							</Col>
						</Row>
						<Row>
							<Col lg={12} className="">
								dfasf
							</Col>
						</Row>
					</Col>
					<Col xs={12} lg={4} className="profileMainContent center">
						<Row>
							<Col lg={12} className="ImageLoader loaded" >
								<div className="colContent">
									<Carousel 
										uid={this.props.girl.uid}
										images={this.props.girl.images}
										activeImage={this.props.girl.activeImage}
										isProfile={true}
									/>
								</div>
							</Col>
						</Row>
					</Col>
					<Col xs={12} lg={4} className="profileMainContent right">
						<Row>
							<Col lgOffset={2} lg={8} className="" >
								<RequestAppointment />
							</Col>
						</Row>
					</Col>
				</Row>
				<Row>
					<Col xs={12} lgOffset={3} lg={6} className="profileNameHeader">
						<form>
			          <SingleMessage 
								theme="dark"
								imgSrc="https://www.billboard.com/files/media/ariana-grande-live-2016-bw-03-billboard-1548.jpg"
								value={`I just checked. I did delete all my rooms. Or "unlist" as it says on airbnb. So it's AirBnB's fault. Contact them. They have to give you a nice refund coz it's their mistake.`}
								isForm={true}
								/>
			      </form>
					</Col>
				</Row>
				<Row>
					<Col xs={12} lgOffset={3} lg={6} className="profileNameHeader">
						<SingleMessage 
						theme="dark"
						imgSrc="https://www.billboard.com/files/media/ariana-grande-live-2016-bw-03-billboard-1548.jpg"
						message={`I just checked. I did delete all my rooms. Or "unlist" as it says on airbnb. So it's AirBnB's fault. Contact them. They have to give you a nice refund coz it's their mistake.`}
						dateTime={Date.now()}
						/>
					<SingleMessage 
						theme="light"
						imgSrc="https://www.billboard.com/files/media/ariana-grande-live-2016-bw-03-billboard-1548.jpg"
						message={`text text text text text text text text text text text text text text text text text text
									  text text text text text text text text text text text text text text text text text text
									  text text text text text text text text text text text text text text text text text text
									  text text text text text text text text text text text text text text text text text text`}
						dateTime={Date.now()}
					/>
					<SingleMessage 
						theme="dark"
						imgSrc="https://www.billboard.com/files/media/ariana-grande-live-2016-bw-03-billboard-1548.jpg"
						message={`text text text text text text text text text text text text text text text text text text
									  text text text text text text text text text text text text text text text text text text
									  text text text text text text text text text text text text text text text text text text
									  text text text text text text text text text text text text text text text text text text`}
						dateTime={Date.now()}
					/>
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
				</div> : null }
			</Grid>

		);
	}
};

const mapStateToProps = state => {
  return {
    girl: state.girl
  };
};

export default connect(mapStateToProps, { loadGirlData })(Profile);