import React, { Component } from 'react';

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

import {
  validatePassword,
  validateEmail
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
  }

  render() {
    console.log(this.state);
    return (
      <Modal show={this.props.showModal} onHide={this.props.onCloseModal}>
        <Modal.Body className="signUpModalBody">
          <Button onClick={this.props.onCloseModal}><i className="mdi mdi-close mdi-24px modalCloseButton" aria-hidden="true"></i></Button>
          <div className="modalTitle"><strong>Please, enter your email address</strong></div>
          <Form className="signupForm big" onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup 
            className="emailOfPhoneInput"
            validationState={this.state.isEmailValid ? null : "error"}
          >
            <InputGroup>
              <FormControl 
                type="text" 
                placeholder="Email address" 
                value={this.state.emailValue} 
                onChange={e => this.setState({emailValue: e.target.value})}
              />
              <InputGroup.Addon><i className="mdi mdi-email-outline mdi-18px" aria-hidden="true"></i></InputGroup.Addon>
            </InputGroup>
            {this.state.isEmailValid ? null : (<HelpBlock>Please input a valid email address.</HelpBlock>)}
          </FormGroup>
          <Button type="submit" className="signUpButton">Reset password</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
};

export default LoginModal;