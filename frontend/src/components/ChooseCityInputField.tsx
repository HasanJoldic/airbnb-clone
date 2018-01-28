import React, { Component } from "react";

import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { connect } from "react-redux";

import InputPopup from "./common/InputPopup";

import "./ChooseCityInputField.less";
import { 
	Form,
	FormControl,
	FormGroup,
	InputGroup,
	Grid
} from "react-bootstrap";
import Combobox from "react-widgets/lib/Combobox";



class ChooseCityInputField extends Component<any, any> {
	constructor(props) {
		super(props);
		this.state = {
			places: this.props.places.slice(0,5),
			showPopup: false,
			placeValue: this.props.selectedPlace
		};
	}

	filterPlaces(filter, places) {
		let filteredPlaces = [];
		places.forEach(place => {
			if(place.toLowerCase().indexOf(filter.toLowerCase()) === 0) {
				filteredPlaces.push(place);
			}
		});
		this.setState({
			places: filteredPlaces.slice(0,5)
		});
	}

	handleChange(e) {
		this.setState({
			placeValue: e.target.value
		});
		this.filterPlaces(e.target.value, this.props.places);
	}

	handleClick(place) {
		this.setState({
			placeValue: place
		});
		this.handleSubmit(null);
	}

	handleSubmit(e) {
		if(e) {
			e.preventDefault();
		}
		
	}

	render() {
		const self = this;
		const popupChildren = this.state.places.map(place => {
			return (
				<Grid 
					key={`popupCityValue${place}`} 
					className="inputPopupChild"
					onClick={() => this.handleClick(place)}>
						<i className="mdi mdi-map-marker" aria-hidden="true"></i>
						<span>{place}</span>
				</Grid>
			);
		});

		return (
			<Form className="cityInputForm" onSubmit={this.props.onSubmit}>
	      <FormGroup className="cityInputContainer" onSubmit={this.handleSubmit}>
	        <InputGroup>
	          <FormControl 
	            type="text" 
	            placeholder="Try Vienna" 
	            value={this.state.placeValue} 
	            onChange={this.handleChange.bind(this)}
	            onFocus={() => this.setState({showPopup: true})}
	            onBlur={() => setTimeout(function() { this.setState({showPopup: false}); }.bind(this), 500)}/>
	          <InputGroup.Addon><i className="mdi mdi-magnify mdi-36px cityInputSearchIcon" aria-hidden="true"></i></InputGroup.Addon>
	      	</InputGroup>
	      </FormGroup>
	      {this.state.showPopup ? <InputPopup>{popupChildren}</InputPopup> : null }
	  	</Form>
		);
	}
};

const mapStateToProps = state => {
	return {
		places: state.app.places,
		selectedPlace: state.app.selectedPlace
	};
};

export default connect(mapStateToProps)(ChooseCityInputField);