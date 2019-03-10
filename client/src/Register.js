import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './form.css'
import Button from 'react-bootstrap/Button';
import {
  Redirect
} from "react-router-dom";

class Register extends Component {
  constructor(props) {
      super(props);

      // all fields of the form and flag to check for proper registration
      this.state = {
        firstName: "",
        lastName: "",
        preferredName: "",
        email: "",
        password: "",
        registeredCorrectly: false
      };
  }

  validateForm = () => {
    // TODO: Add criteras to password
    return this.state.email.length > 0 && this.state.password.length > 0
          && this.state.firstName.length > 0 && this.state.lastName.length > 0
          && this.state.preferredName.length > 0;
  }

  handleChange = event => {
    // when change occurs update the states
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    try {
      // create an object to store the inputs from the form
      const registerInfo = {
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        preferredName: this.state.preferredName,
        password: this.state.password
      };
      // post request to add the given info into the database
      const response = await axios({
          method: 'post',
          url: 'http://127.0.0.1:2002/register',
          data: registerInfo,
          withCredentials: false
      });
      console.log(response);
      // verifies if the registration was successful
      if (response.data.isRegistered) {
        // will update the flag
        this.setState({
          registeredCorrectly: true
        });
      } else {
        alert('Issue with registration. Try again later!');
      }
    } catch (error) {
      alert(`There has been an error! Error: ${error}  Please try again later!`);
    }

  }
  render() {
    // TODO: add more flags for already used email etc
    // if flag triggers the user will be sent to the dashboard
    if (this.state.registeredCorrectly) {
      return  <Redirect to='/' />;
    }

    return (
      // TODO: make a register form?
      // form that will take in the user name, email, and password
      <div className = "formContainer">
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

          <Button block disabled = { !this.validateForm() } variant = "primary" type = "submit">Sign Up
          </Button>
        </Form>
      </div>
    );
  }
}

export default Register;
