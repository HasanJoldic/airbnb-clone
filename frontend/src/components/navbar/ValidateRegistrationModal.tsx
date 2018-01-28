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

import {
  validatePhoneNumber,
  validatePassword,
  validateEmail,
  validateDateOfBirth
} from "../../utils/utils";

import "./ValidateRegistrationModal.less";

interface IValidateRegistrationModalState {
  validationCodeValue: string;
  isValidationCodeValid: boolean;
}

class ValidateRegistrationModal extends Component<any, IValidateRegistrationModalState> {
  constructor(props) {
    super(props);
    this.state = {
      validationCodeValue: "",
      isValidationCodeValid: true
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    console.log(this.state);
    return (
    	<Modal show={this.props.showModal} onHide={this.props.onCloseModal}>
        <Modal.Body className="signUpModalBody">
          <Button onClick={this.props.onCloseModal}><i className="mdi mdi-close mdi-24px modalCloseButton" aria-hidden="true"></i></Button>
          <div className="modalTitle"><strong>Please, enter the validation code you recieved</strong></div>
          <Form className="signupForm big" onSubmit={this.handleSubmit.bind(this)}>
          <Row>
            <Col xs={12} lgOffset={3} lg={6}>
              <FormGroup className="validationCodeInput" validationState={this.state.isValidationCodeValid ? null : "error"}>
                <InputGroup>
                  <FormControl 
                    type="text" 
                    placeholder="Email validation code" 
                    value={this.state.validationCodeValue} 
                    onChange={e => this.setState({validationCodeValue: e.target.value})}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <Button type="submit" className="signUpButton">Sign up</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
};

export default ValidateRegistrationModal;