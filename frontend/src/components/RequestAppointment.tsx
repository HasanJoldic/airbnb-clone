import React, { Component } from "react";

import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";

import { 
	Grid, 
	Row, 
	Col 
} from 'react-flexbox-grid';

import { 
	Button,
	ButtonGroup
} from 'react-bootstrap';

import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import Map from "./Map";

Moment.locale("de");
momentLocalizer();

import "./RequestAppointment.less";

class RequestAppointment extends Component<any, any> {

	constructor(props) {
    super(props)
    this.state = { address: "" }
  }

  onChange = (address) => this.setState({ address })
  render() {
  	const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      disabled: true,
      placeholder: "Address"
    }
	return (
		<Grid className="RequestAppointment">
			<Row>
				<Col lg={2} className="pickerLabel">Von:  </Col>
				<Col lg={10} className=""><DateTimePicker /></Col>
			</Row>
			<Row>
				<Col lg={2} className="pickerLabel">Bis:  </Col>
				<Col lg={10} className=""><DateTimePicker /></Col>
			</Row>
			<Row className="locationPickerButtons">
				<Col lg={2} className="pickerLabel">Wo:  </Col>
				<Col lg={10} className="value">
					<ButtonGroup>
						<Button>My place</Button>
						<Button>Your place</Button>
					</ButtonGroup>
				</Col>
			</Row>
			<Row>
				<Col lg={12} className="locationPicker disabled"><PlacesAutocomplete inputProps={inputProps} /></Col>
			</Row>
			<Row className="sendRequest">
				<Col lgOffset={3} lg={6} className=""><Button>Send request</Button></Col>
			</Row>
			<Row>
				<Col lg={12} className="">
					<Map 
						showMarker={true} 
						googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
					  loadingElement={<div style={{ height: `100%` }} />}
					  containerElement={<div style={{ height: `200px` }} />}
					  mapElement={<div style={{ height: `100%` }} />}
					  location={{lat: 48.210033, lng: 16.363449}}
					/>
				</Col>
			</Row>
		</Grid>
	);
}
};


export default RequestAppointment;