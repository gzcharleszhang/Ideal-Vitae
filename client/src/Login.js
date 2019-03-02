import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import {
  Redirect
} from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      verified: false
    };

  }

  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const  loginInfo = {
        email: this.state.email,
        password: this.state.password
      };
      const response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:2002/login',
        data: loginInfo,
        withCredentials: false
      });
      console.log("wuwufhwhfwhf");
      console.log(response);
      console.log(this.state.verified);
      if (response.data.isAuthenticated) {
        this.setState({
          verified: true
        });
      } else {
        alert(`Wrong credentials`);
      }
    } catch (error) {
        alert(`There has been an error! Error: ${error}  Please try again later!`);
    }
  }

  render() {

    if (this.state.verified) {
      return  <Redirect to='/' />;
    }

    return (
      <Form onSubmit = { this.handleSubmit }>
        <Form.Group controlId = "email">
          <Form.Label>Email address</Form.Label>
          <Form.Control autoFocus type = "email" placeholder = "Enter email" value = { this.state.email } onChange = { this.handleChange } />
          <Form.Text className = "text-muted">
            Use the email you signed up with!
          </Form.Text>
        </Form.Group>

        <Form.Group controlId = "password">
          <Form.Label>Password</Form.Label>
          <Form.Control type = "password" placeholder = "Password" value = { this.state.password } onChange = { this.handleChange } />
        </Form.Group>
        // Add an option to reset password/register
        <Button block disabled = { !this.validateForm() } variant = "primary" type = "submit">
          Submit
        </Button>
      </Form>
    );
  }

};

export default Login;
