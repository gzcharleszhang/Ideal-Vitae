import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  Redirect
} from "react-router-dom";
import './form.css';

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

  // checking that users have input information
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
      const loginInfo = {
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

    const { verified, email, password } = this.state;
    // if flag triggers the user will be directed to the dashboard
    if (verified) {
      return <Redirect to='/' />;
    }

    return (
      // TODO: make a login form
      // will get the email and password
      <div className="formContainer">
        <Form onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              label="Email"
              defaultValue="Use the email you signed up with!"
              variant="outlined"
              margin="normal"
              value={email}
              // TODO: Add restrictions to password
              onChange={this.handleChange}
            />

            <TextField
              id="password"
              label="Password"
              variant="outlined"
              margin="normal"
              value={password}
              type="password"
              // TODO: Add restrictions to password
              onChange={this.handleChange}
            />
          // Add an option to reset password/register
          <Button block disabled={!this.validateForm()} variant="primary" type="submit">Submit
          </Button>
        </Form>
      </div>
    );
  }

};

export default Login;
