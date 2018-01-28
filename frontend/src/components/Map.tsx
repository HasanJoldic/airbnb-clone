import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const Map = (props) => {
	const { lat, lng } = props.location;
  return (
  	<GoogleMap
	    defaultZoom={17}
	    center={{ lat: lat, lng: lng }}
  	>
    	{props.showMarker && <Marker position={{ lat: lat, lng: lng }} />}
  	</GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(Map));