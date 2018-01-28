import React, { Component } from "react";

import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";

import {
  Link
} from "react-router-dom";

import Img from "react-image";
import axios from "axios";

import "./Carousel.less";

class Carousel extends Component<any, any> {
	constructor(props) {
    super(props)
    this.state = {
			style: {
				"backgroundImage": `url(/src/assets/images/girls/${props.uid}/${props.activeImage}.jpg)`,
				"backgroundSize": "cover",
		    "backgroundRepeat": "no-repeat",
		    "backgroundPosition": "50% 50%"
			},
			isLoading: true,
			activeImage: props.activeImage,
			uid: props.uid,
			images: props.images
		};
    axios.get("/src/assets/images/1.json")
		  .then(json => {
		  	console.log(json.data.height / json.data.width);
		  	if (json.data.height / json.data.width > 1.5 || json.data.height / json.data.width < 0.75) {
		  		this.setState({
		  			style: {
		  				...this.state.style, 
		  				backgroundSize: "contain"
		  			}
		  		});
		  	}
		  	this.setState({
		  		isLoading: false
		  	});
		});
  }

  handleClick(type) {
  	const { activeImage, images } = this.state;
  	if (type === "left") {
  		return () => {
  			let index = images.indexOf(activeImage);
  			if (index === 0) {
  				this.setState({
  					activeImage: images[images.length-1]
  				});
  			} else {
  				this.setState({
  					activeImage: images[index-1]
  				});
  			}
  		}
  	} else if (type === "right") {
  		return () => {
  			let index = images.indexOf(activeImage);
  			if (index === (images.length-1)) {
  				this.setState({
  					activeImage: images[0]
  				});
  			} else {
  				this.setState({
  					activeImage: images[index+1]
  				});
  			}
  		}
  	}
  }

	render() {
		console.log("CAROUSEL", this.props, this.state);
		let carouselClass = "carouselImageContainer ";
		if (this.props.isProfile) {
			carouselClass += "profile";
		}
		const { uid, activeImage } = this.state;
		const style = {
			...this.state.style,
			"backgroundImage": `url(/src/assets/images/girls/${uid}/${activeImage}.jpg)`
		};

		return (
			<div className="carouselImageContainerContainer">
			{this.state.isLoading ? null :
				<div>
					<div className={carouselClass} style={style}>
						<div className="iconContainer left" onClick={this.handleClick("left")}>
							<i className="fa fa-angle-left fa-3x" aria-hidden="true"></i>
						</div>
						<div className="iconContainer right" onClick={this.handleClick("right")}>
							<i className="fa fa-angle-right fa-3x" aria-hidden="true"></i>
						</div>
			    	{this.props.isProfile ? null : <Link to={`/profile/${uid}`} className="clickImage" /> }
			    </div>
			    {this.props.isProfile ? null : <div className="unsetAll">
				    <Link to={`/profile/${uid}`}>
		     			{this.props.children}
		     		</Link>
	     		</div> }
	      </div>
	   	}
	   	</div>
		);
	}
}

export default injectIntl(Carousel);