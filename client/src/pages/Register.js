import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import WarningText from './WarningText';
import {
  Redirect
} from "react-router-dom";
import axios from 'axios';
import './form.css'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  }
});

class Register extends Component {
  constructor(props) {
    super(props);

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
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

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
    const properEmail = email.match(emailRegEx) ? true : false;

    this.setState({
      isPasswordsSame,
      isPasswordProper,
      properEmail,
    });

    if (!(properEmail && properPassword && passwordMatch)) {
      return;
    }
    try {
      // create an object to store the inputs from the form
      const {
        email,
        firstName,
        lastName,
        preferredName,
        password,
      } = this.state;
      const registerInfo = {
        email,
        firstName,
        lastName,
        preferredName,
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
        });
      } else {
        alert('Issue with registration. Try again later!');
      }
    } catch (error) {
      alert(`There has been an error! Error: ${error}  Please try again later!`);
    }
  }

  render() {
    const {
      classes,
    } = this.props;
    const {
      registeredCorrectly,
      firstName,
      lastName,
      preferredName,
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
      <div className="formContainer">
        <form onSubmit={this.handleSubmit} className={classes.container}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
          className={classes.root}
          >
          // align the first and last name
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
                className={classes.textField}
                margin="normal"
                onChange={this.handleChange}
                variant="outlined"
                required
              />

              <TextField
                id="lastName"
                label="Last Name"
                value={lastName}
                onChange={this.handleChange}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                required
              />

            </Grid>
            <TextField
              id="preferredName"
              label="Preferred Name"
              value={preferredName}
              onChange={this.handleChange}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              required
            />
            <WarningText issue={!isEmailProper} rules="Emails must alpha-numeric and end with a propper address"/>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange}
              required
            />
            <WarningText issue={!isPasswordProper} rules="The password must contain at least 1 capital, 1 lowercase, and one number"/>
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              value={password}
              className={classes.textField}
              margin="normal"
              type = "password"
              onChange={this.handleChange}
              required
            />
            <WarningText issue={!isPasswordsSame} rules="The passwords must be the same"/>
            <TextField
              id="passwordCopy"
              label="Confirm Password"
              variant="outlined"
              className={classes.textField}
              margin="normal"
              value={passwordCopy}
              type="password"
              onChange={this.handleChange}
              required
            />
            <Button
              block
              variant="contained"
              type="submit"
              className={classes.button}>Sign Up</Button>

          </Grid>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
