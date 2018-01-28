import React, { Component } from 'react';

import { connect } from "react-redux";

import "./Navbar.less";

import ChooseCityInputField from "../components/ChooseCityInputField";
import NavButtons from "../components/navbar/NavButtons";

import SignupModal from "../components/navbar/SignupModal";
import ValidateRegistrationModal from "../components/navbar/ValidateRegistrationModal";
import LoginModal from "../components/navbar/LoginModal";
import ForgotPasswordModal from "../components/navbar/ForgotPasswordModal";

interface INavbarProps {
  onMobileNavMenuClick: () => void;
  isAuthenticated: boolean;
}
interface INavbarState {
  showNavbarModal: "login"|"signup"|"validate"|"forgotPassword";
}

class Navbar extends Component<INavbarProps, INavbarState> {
  constructor(props) {
    super(props);
    this.state = {
      showNavbarModal: null
    }
  }


  handleNavbarButtonClick(type: "messages"|"info"|"login"|"logout"|"signup"|"forgotPassword") {
    switch (type) {
      case "messages":
        break;
      case "info":
        break;
      case "login":
        this.setState({
          showNavbarModal: "login"
        });
        break;
      case "logout":
        break;
      case "signup":
        this.setState({
          showNavbarModal: "signup"
        });
        break;
      case "forgotPassword":
        this.setState({
          showNavbarModal: "forgotPassword"
        });
        break;
      default: 
        break;
    }
    console.log(type);
  }

  render() {
    return (
    	<div className="Navbar-container">
        <div className="searchFieldAndMenu">
          <div className="ChooseCityInputField">
            <ChooseCityInputField />
          </div>
          <i 
            className="fa fa-bars fa-3x navButtonsMenu" 
            aria-hidden="true" 
            onClick={this.props.onMobileNavMenuClick}>
          </i>    
        </div>
        <div className="NavButtons">
          <NavButtons 
            onNavbarButtonClick={this.handleNavbarButtonClick.bind(this)}
            isAuthenticated={this.props.isAuthenticated}
          />
        </div>
        <SignupModal 
          showModal={this.state.showNavbarModal === "signup"} 
          onCloseModal={() => this.setState({ showNavbarModal: null })}
        />
        <ValidateRegistrationModal 
          showModal={this.state.showNavbarModal === "validate"} 
          onCloseModal={() => this.setState({ showNavbarModal: null })}
        />
        <LoginModal 
          showModal={this.state.showNavbarModal === "login"} 
          onCloseModal={() => this.setState({ showNavbarModal: null })}
          onForgotPasswordClick={() => this.handleNavbarButtonClick.bind(this)("forgotPassword")}
        />
        <ForgotPasswordModal 
          showModal={this.state.showNavbarModal === "forgotPassword"} 
          onCloseModal={() => this.setState({ showNavbarModal: null })}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
};

export default connect(mapStateToProps)(Navbar);