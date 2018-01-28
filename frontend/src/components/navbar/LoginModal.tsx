import React, { Component } from 'react';
import { connect } from "react-redux";

import {
  Modal,
  Button,
  Grid,
  Row,
  Col,
  FormGroup,
  InputGroup,
  FormControl,
  Form,
  HelpBlock
} from "react-bootstrap";
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import { login } from "../../reducers/auth/actions";

import LinkText from "../common/LinkText";

import {
  validatePassword,
  validateEmail,
  validateDateOfBirth
} from "../../utils/utils";

import "./LoginModal.less";

interface ISignupModalState {
  emailValue: string;
  passwordValue: string;
  isEmailValid: boolean;
  isPasswordValid: boolean;
}

class LoginModal extends Component<any, ISignupModalState> {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: "",
      passwordValue: "",
      isEmailValid: true,
      isPasswordValid: true,
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let isFormValid = true;
    if (!validateEmail(this.state.emailValue)) {
      isFormValid = false;
      this.setState({ isEmailValid: false });
    } else {
      this.setState({ isEmailValid: true });
    }
    if (!validatePassword(this.state.passwordValue)) {
      isFormValid = false;
      this.setState({ isPasswordValid: false });
    } else {
      this.setState({ isPasswordValid: true });
    }
    if (isFormValid) {
      this.props.login({
        email: this.state.emailValue,
        password: this.state.passwordValue
      });
    }
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.onCloseModal}>
        <Modal.Body className="loginModalBody">
          <Button onClick={this.props.onCloseModal}><i className="mdi mdi-close mdi-24px modalCloseButton" aria-hidden="true"></i></Button>
          <div className="modalTitle"><strong>Log in with email</strong></div>
          <Form className="signupForm big" onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup 
            className="emailInput"
            validationState={this.state.isEmailValid ? null : "error"}
          >
            <InputGroup>
              <FormControl 
                type="email" 
                placeholder="Email address" 
                value={this.state.emailValue} 
                onChange={e => this.setState({emailValue: e.target.value})}
              />
              <InputGroup.Addon><i className="mdi mdi-email-outline mdi-18px" aria-hidden="true"></i></InputGroup.Addon>
            </InputGroup>
            {this.state.isEmailValid ? null : (<HelpBlock>Please input a valid email.</HelpBlock>)}
          </FormGroup>
          <FormGroup validationState={this.state.isPasswordValid ? null : "error"}>
            <InputGroup>
              <FormControl 
                type="password" 
                placeholder="Password" 
                value={this.state.passwordValue}
                onChange={e => this.setState({passwordValue: e.target.value})}
              />
              <InputGroup.Addon><i className="mdi mdi-lock-outline mdi-18px" aria-hidden="true"></i></InputGroup.Addon>          
            </InputGroup>
            {this.state.isPasswordValid ? null : (<HelpBlock>Please input a valid password.</HelpBlock>)}
          </FormGroup>
          <LinkText onClick={this.props.onForgotPasswordClick}>Forgot password</LinkText>
          <Button type="submit" className="signUpButton">Log in</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
};

export default connect(null, { login })(LoginModal);