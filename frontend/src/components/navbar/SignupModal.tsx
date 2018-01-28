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
  HelpBlock,
  Checkbox
} from "react-bootstrap";
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import {
  validatePassword,
  validateEmail,
  validateDateOfBirth
} from "../../utils/utils";

import callApi from "../../utils/utils";
import { register } from "../../reducers/auth/actions";

import "./SignupModal.less";

interface ISignupModalState {
  emailValue: string;
  passwordValue: string;
  dateOfBirthValue: string;
  userTypeValue: "client"|"worker";
  isEmailValid: boolean;
  isPasswordValid: boolean;
  isDateOfBirthValid: boolean;
}

class SignupModal extends Component<any, ISignupModalState> {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: "",
      passwordValue: "",
      dateOfBirthValue: null,
      userTypeValue: "client",
      isEmailValid: true,
      isPasswordValid: true,
      isDateOfBirthValid: true
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
    if (!validateDateOfBirth(this.state.dateOfBirthValue)) {
      isFormValid = false;
      this.setState({ isDateOfBirthValid: false });
    } else {
      this.setState({ isDateOfBirthValid: true });
    }
    if (isFormValid) {
      console.log("sign up is valid");
      this.props.register({
        email: this.state.emailValue,
        password: this.state.passwordValue,
        dateOfBirth: this.state.dateOfBirthValue,
        userType: this.state.userTypeValue
      });
    }
  }

  render() {
    return (
    	<Modal show={this.props.showModal} onHide={this.props.onCloseModal}>
        <Modal.Body className="signUpModalBody">
          <Button onClick={this.props.onCloseModal}><i className="mdi mdi-close mdi-24px modalCloseButton" aria-hidden="true"></i></Button>
          <div className="modalTitle"><strong>Sign up with email</strong></div>
          <Form className="signupForm big" onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup validationState={this.state.isEmailValid ? null : "error"}>
            <InputGroup>
              <FormControl 
                type="email" 
                placeholder="Email address" 
                value={this.state.emailValue} 
                onChange={e => this.setState({emailValue: e.target.value})}
              />
              <InputGroup.Addon><i className="mdi mdi-email-outline mdi-18px" aria-hidden="true"></i></InputGroup.Addon>
              
            </InputGroup>
            {this.state.isEmailValid ? null : (<HelpBlock>Please input a valid email address.</HelpBlock>)}
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
          <FormGroup validationState={this.state.isDateOfBirthValid ? null : "error"}>
            <InputGroup>
              <DateTimePicker 
                time={false} 
                placeholder="Date of birth" 
                value={this.state.dateOfBirthValue}
                onChange={value => this.setState({ dateOfBirthValue: value })}
              />
            </InputGroup>
            <HelpBlock>To sign up, you must be 18 or older. Your birthday will not be visible to others.</HelpBlock>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <Checkbox
                onChange={value => this.setState({userTypeValue: value})}
                value={this.state.userTypeValue}
              >Register as worker</Checkbox>
            </InputGroup>
          </FormGroup>
          <Button type="submit" className="signUpButton">Sign up</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
};

export default connect(null, { register })(SignupModal);