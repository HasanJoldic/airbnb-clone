import React, { Component } from "react";

import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";

import { 
	Grid, 
	Row, 
	Col 
} from 'react-flexbox-grid';

import Img from "react-image";
import Carousel from "./Carousel";

import "./ProfileThumbnails.less";

import ImageLoader from "./ImageLoader";

const ProfileThumbnails: any = ({intl}) => {
	return (
		<Grid className="ProfileThumbnails">
			<Row>
				<Col xs={12}>
					<img src="https://www.billboard.com/files/media/ariana-grande-live-2016-bw-03-billboard-1548.jpg" />
					<img src="https://www.billboard.com/files/media/ariana-grande-live-2016-bw-03-billboard-1548.jpg" />
					<img src="https://www.billboard.com/files/media/ariana-grande-live-2016-bw-03-billboard-1548.jpg" />
					<img src="https://www.billboard.com/files/media/ariana-grande-live-2016-bw-03-billboard-1548.jpg" />
					<img src="https://www.billboard.com/files/media/ariana-grande-live-2016-bw-03-billboard-1548.jpg" />
					<img src="https://www.billboard.com/files/media/ariana-grande-live-2016-bw-03-billboard-1548.jpg" />
				</Col>
			</Row>
		</Grid>
	);
};

ProfileThumbnails.propTypes = {
	intl: intlShape.isRequired
};

export default injectIntl(ProfileThumbnails);