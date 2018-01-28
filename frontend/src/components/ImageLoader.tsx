import React, { Component } from "react";

import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";

import { connect } from "react-redux";

import { load, loadingSuccess } from "../reducers/app/actions";
import { loadGirlsData } from "../reducers/girls/actions";

import { 
	Grid, 
	Row, 
	Col 
} from 'react-flexbox-grid';

import Carousel from "./Carousel";

import "./ImageLoader.less";

class ImageLoader extends Component<any, any> {

	constructor(props) {
		super(props);
		props.loadGirlsData();
	}
	render() {

		console.log("IMAGES", this.props.girls.length);
		let thumbnails = [];
		if (this.props.girls) {
			for (let i = 0; i < this.props.girls.length; i++) {
				let { uid, activeImage, images } = this.props.girls[i];
				thumbnails = [...thumbnails,
					<Col key={`HomepageImage${i}`} xs={12} lg={3} className="ImageLoader loaded" >
						<div className="colContent">
							<Carousel
								images={images}
								uid={uid}
								activeImage={activeImage}
							>
							<div className="homepageThumbnailText">
								<div className="lineOne">
									Alice Keystone
								</div>
								<div className="lineTwo">
									200€/Hour
								</div>
							</div>
							</Carousel>
						</div>
					</Col>
				];
			}
		}

		const noResultsPage = (
			<div className="noResultsContainer">
				<h1>No results</h1>
				<h4>Try adjusting your search</h4>
			</div>
		);

		let imagesRows = [];
		for (let i = 0; i < thumbnails.length / 4; i++) {
			let imagesCols = [];
			for (let j = 0; j < 4; j++) {
				let index = (i*4) + j;
				if (index >= thumbnails.length) break;
				imagesCols.push(thumbnails[index]);
			}
			imagesRows.push(
				(
					<Row key={`HomepageImageRow${i}`} className="imageLoaderRow">
						{imagesCols}
					</Row>
				)
			);
		}

		return (
			<Grid>
			  {imagesRows.length > 0 ? imagesRows : noResultsPage}
			</Grid>
		);
	}
};

const mapStateToProps = state => {
  return {
    girls: state.girls
  };
};

export default connect(mapStateToProps, { loadGirlsData })(ImageLoader);