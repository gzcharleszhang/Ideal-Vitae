import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Register extends Component {
  constructor(props) {
      super(props);

      this.state = {
        firstName: "",
        lastName: "",
        preferredName: "",
        email: "",
        password: ""
      };
  }

  validateForm = () => {
    // TODO: Add criteras to password
    return this.state.email.length > 0 && this.state.password.length > 0
          && this.state.firstName.length > 0 && this.state.lastName.length > 0
          && this.state.preferredName.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    // TODO: attempt to store value and check
    //  if the registration should continue or things need to be changed
  }
  render() {
    return (
      <Form onSubmit = { this.handleSubmit }>
        <Form.Group autoFocus controlId = "firstName">
          <Form.Label> First Name </Form.Label>
          <Form.Control placeholder = "Enter First Name" value = { this.state.firstName } onChange = { this.handleChange }/>
        </Form.Group>

        <Form.Group controlId = "lastName">
          <Form.Label> Last Name </Form.Label>
          <Form.Control placeholder = "Enter Last Name" value = { this.state.lastName } onChange = { this.handleChange }/>
        </Form.Group>

        <Form.Group controlId = "preferredName">
          <Form.Label> Preferred Name </Form.Label>
          <Form.Control placeholder = "Enter Preferred Name" value = { this.state.preferredName } onChange = { this.handleChange }/>
        </Form.Group>

        <Form.Group controlId = "email">
          <Form.Label> Email Address </Form.Label>
          <Form.Control type = "email" placeholder = "Enter Email" value = { this.state.email } onChange = { this.handleChange }/>
        </Form.Group>

        <Form.Group controlId = "password">
          <Form.Label> Password </Form.Label>
          <Form.Control type = "password" placeholder = "Enter Password" value = { this.state.password } onChange = { this.handleChange }/>
        </Form.Group>

        <Button block disabled = { !this.validateForm() } variant = "primary" type = "submit">
        Sign Up
        </Button>
      </Form>
    );
  }
}

export default Register;
