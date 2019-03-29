import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import WarningText from './WarningText';
import {
  Redirect
} from "react-router-dom";
import axios from 'axios';
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
      registeredCorrectly: false,
      isEmailProper: true,
      isPasswordProper: true,
      isPasswordsSame: true,
    };
  }

  handleChange = event => {
    // when change occurs update the states
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email,
            password,
            passwordCopy } = this.state;
    const emailRegEx = /^[\w,\d]+[\d,A-Z,a-z,_,.,-]*@[A-Z,a-z]*\.[A-Z,a-z]*$/;
    const passwordMatch = password === passwordCopy;
    const properPassword = /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
    const properEmail = email.match(emailRegEx) ? true : false;

    this.setState({
      isPasswordsSame: passwordMatch,
      isPasswordProper: properPassword,
      isEmailProper: properEmail,
    });

    if (!(properEmail && properPassword && passwordMatch)) {
      return;
    }
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
    const { registeredCorrectly,
            firstName,
            lastName,
            preferredName,
            email,
            password,
            passwordCopy,
            isPasswordsSame,
            isPasswordProper,
            isEmailProper } = this.state;
            console.log(isPasswordsSame);
    if (registeredCorrectly) {
      return <Redirect to='/dashboard' />;
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
                value={firstName}
                style={{marginLeft:"2%"}}
                onChange={this.handleChange}
                variant="outlined"
                required
              />

              <TextField
                id="lastName"
                label="Last Name"
                value={lastName}
                onChange={this.handleChange}
                variant="outlined"
                required
              />

            </Grid>
            <TextField
              id="preferredName"
              label="Preferred Name"
              value={preferredName}
              onChange={this.handleChange}
              variant="outlined"
              required
            />
            <WarningText issue={!isEmailProper} rules="Emails must alpha-numeric and end with a propper address"/>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={this.handleChange}
              required
            />
            <WarningText issue={!isPasswordProper} rules="The password must contain at least 1 capital, 1 lowercase, and one number"/>
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              value={password}
              type = "password"
              onChange={this.handleChange}
              required
            />
            <WarningText issue={!isPasswordsSame} rules="The passwords must be the same"/>
            <TextField
              id="passwordCopy"
              label="Confirm Password"
              variant="outlined"
              value={passwordCopy}
              type="password"
              onChange={this.handleChange}
              required
            />

            <Button block variant="contained" type="submit">Sign Up
            </Button>
          </Grid>
        </form>
      </div>
    );
  }
}

export default Register;
