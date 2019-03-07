import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './form.css';
import Button from 'react-bootstrap/Button';
import {
  Redirect
} from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    // holding state of input and flag
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
      // updates when change is made
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    try {
      // prepares log in credentials from input
      const  loginInfo = {
        email: this.state.email,
        password: this.state.password
      };
      // post request to verify user
      const response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:2002/login',
        data: loginInfo,
        withCredentials: false
      });

      console.log(response);
      console.log(this.state.verified);
      // checks if user is authenticated
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
    // if flag triggers the user will be directed to the dashboard
    if (this.state.verified) {
      return  <Redirect to='/' />;
    }

    return (
      // will get the email and password
      <div className = "formContainer">
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
      </div>
    );
  }

};

export default Login;
