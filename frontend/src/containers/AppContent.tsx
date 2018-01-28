import React, { Component } from 'react';

import PropTypes from "prop-types";
import {
	Button
} from "react-bootstrap";

import Navbar from "./Navbar";

import "./AppContent.less";

interface IAppContentProps {
  showMobileNavButtons: boolean;
}

interface IAppContentState {
}

class AppContent extends Component<IAppContentProps, any> {
  static propTypes = {
    showMobileNavButtons: PropTypes.bool.isRequired
  };

  static defaultProps = {
    showMobileNavButtons: false
  };

  render() {
    return (
    	<div className="appContent">
      {this.props.showMobileNavButtons ? 
        (<div className="NavButtonsMobile">
          <Button href="#">Messages</Button>
          <Button href="#">Info</Button>
          <Button href="#">Log in</Button>
          <Button href="#">Sign up</Button>
        </div>) : 
        (<div>
          {this.props.children}
        </div>
        )
      }
      </div>
    );
  }
}

export default AppContent;