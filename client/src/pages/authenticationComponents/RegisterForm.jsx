import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import WrapTextField from '../WrapTextField';
import WarningText from '../WarningText';
import {
  Redirect
} from "react-router-dom";
import axios from 'axios';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  }
});

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      passwordCopy: "",
      registeredCorrectly: false,
      isEmailProper: true,
      isPasswordProper: true,
      isPasswordsSame: true,
    };
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const {
      email,
      password,
      passwordCopy,
    } = this.state;
    // regex to verify if email follows standard email format + password to have at least one capital, lowercase, and number
    const emailRegEx = /^[\w,\d]+[\d,A-Z,a-z,_,.,-]*@[A-Z,a-z]*\.[A-Z,a-z]*$/;
    const isPasswordsSame = password === passwordCopy;
    const isPasswordProper = /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
    const isEmailProper = email.match(emailRegEx) ? true : false;
    this.setState({
      isPasswordsSame,
      isPasswordProper,
      isEmailProper,
    });

    if (!(isPasswordsSame && isPasswordProper && isEmailProper)) {
      return;
    }
    try {
      // create an object to store the inputs from the form
      const {
        email,
        firstName,
        lastName,
        username,
        password,
      } = this.state;
      const registerInfo = {
        email,
        firstName,
        lastName,
        username,
        password,
      };
      // post request to add the given info into the database
      const response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:2002/register',
        data: registerInfo,
        withCredentials: true,
      });
      console.log(response);
      // verifies if the registration was successful
      if (response.data.isRegistered) {
        // will update the flag
        this.setState({
          registeredCorrectly: true
        }); // CHECK IF USERNAME / EMAIL IS UNIQUE
      } else {
        alert('Issue with registration. Try again later!');
      }
    } catch (error) {
      alert(`There has been an error! Error: ${error}  Please try again later!`);
    }
  };

  render() {
    const {
      classes,
    } = this.props;
    const {
      registeredCorrectly,
      firstName,
      lastName,
      username,
      email,
      password,
      passwordCopy,
      isPasswordsSame,
      isPasswordProper,
      isEmailProper,
    } = this.state;
    if (registeredCorrectly) {
      return <Redirect to='/dashboard' />;
    }
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className={classes.container}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        className={classes.root}
        >
        <Grid
          container
          item
          direction="row"
          justify="flex-start"
          alignItems="stretch"
          >
            <WrapTextField
              id="firstName"
              label="First Name"
              value={firstName}
              onChangeValue="firstName"
              handleChange={this.handleChange.bind(this)}
              required={true}
            />

            <WrapTextField
              id="lastName"
              label="Last Name"
              value={lastName}
              onChangeValue="lastName"
              handleChange={this.handleChange.bind(this)}
              required={true}
            />

          </Grid>
          <WrapTextField
            id="username"
            label="Username"
            value={username}
            required={true}
            onChangeValue="username"
            handleChange={this.handleChange.bind(this)}
          />
          <WarningText issue={!isEmailProper} rules="Emails must alpha-numeric and end with a propper address"/>
          <WrapTextField
            id="email"
            label="Email"
            value={email}
            onChangeValue="email"
            handleChange={this.handleChange.bind(this)}
            required={true}
          />
          <WarningText issue={!isPasswordProper} rules="The password must contain at least 1 capital, 1 lowercase, and one number"/>
          <WrapTextField
            id="password"
            label="Password"
            value={password}
            type="password"
            onChangeValue="password"
            handleChange={this.handleChange.bind(this)}
            required={true}
          />
          <WarningText issue={!isPasswordsSame} rules="The passwords must be the same"/>
          <WrapTextField
            id="passwordCopy"
            label="Confirm Password"
            value={passwordCopy}
            type="password"
            onChangeValue="passwordCopy"
            handleChange={this.handleChange.bind(this)}
            required={true}
          />
          <Button
            block
            variant="contained"
            type="submit"
            className={classes.button}>Sign Up</Button>
        </Grid>
      </form>
    );
  };
};

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterForm);
