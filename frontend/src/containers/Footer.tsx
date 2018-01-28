import React, { Component } from 'react';

import PropTypes from "prop-types";
import {
	Button
} from "react-bootstrap";

import "./Footer.less";

interface IFooterProps {
}

interface IFooterState {
}

class Footer extends Component<IFooterProps, IFooterState> {
  static propTypes = {
  };

  static defaultProps = {
  };

  render() {
    return (
    	<div className="footer">
        <p>Footer</p>
      </div>
    );
  }
}

export default Footer;