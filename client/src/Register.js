import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {
  Redirect
} from "react-router-dom";
import './form.css'

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
      passwordCopy: "",
      registeredCorrectly: false
    };
  }

  validateForm = () => {
    const { registeredCorrectly, firstName, lastName, preferredName, email, password } = this.state;
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
    const { registeredCorrectly, firstName, lastName, preferredName, email, password, passwordCopy } = this.state;
    // TODO: add more flags for already used email etc
    // if flag triggers the user will be sent to the dashboard
    if (registeredCorrectly) {
      return <Redirect to='/' />;
    }

    return (
      // TODO: make a register form?
      // form that will take in the user name, email, and password
      <div className="formContainer">
        <form onSubmit={this.handleSubmit}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
          >

          <Grid
            container
            item
            direction="row"
            justify="flex-start"
            alignItems="stretch"
            >
              <TextField
                id="firstName"
                label="First Name"
                maring="normal"
                value={firstName}
                style={marginLeft:"2%"}
                onChange={this.handleChange}
                variant="outlined"
              />

              <TextField
                id="lastName"
                label="Last Name"
                value={lastName}
                onChange={this.handleChange}
                variant="outlined"
              />
            </Grid>
            <TextField
              id="preferredName"
              label="Preferred Name"
              margin="normal"
              value={preferredName}
              onChange={this.handleChange}
              variant="outlined"
            />

            <TextField
              id="email"
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              // TODO: Add restrictions to email
              onChange={this.handleChange}
            />

            <TextField
              id="password"
              label="Password"
              variant="outlined"
              margin="normal"
              value={password}
              type = "password"
              // TODO: Add restrictions to password
              onChange={this.handleChange}
            />

            <TextField
              id="passwordCopy"
              label="Confirm Password"
              variant="outlined"
              helperText="Make sure your passwords match!"
              margin="normal"
              value={passwordCopy}
              type="password"
              // TODO: make sure they are the same
              onChange={this.handleChange}
            />
          </Grid>
          <Button block disabled={!this.validateForm()} variant="primary" type="submit">Sign Up
          </Button>
        </form>
      </div>
    );
  }
}

export default Register;
