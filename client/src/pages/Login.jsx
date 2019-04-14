import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Redirect
} from "react-router-dom";
import axios from 'axios';
import './form.css';

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
      const {
        email,
        password,
      } = this.state;
      const loginInfo = {
        email,
        password,
      };
      // post request to verify user
      const response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:2002/login',
        data: loginInfo,
        withCredentials: true,
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
    const {
      classes,
    } = this.props;
    const {
      verified,
      email,
      password,
    } = this.state;
    // if flag triggers the user will be directed to the dashboard
    if (verified) {
      return <Redirect to='/dashboard' />;
    }
    return (
      // TODO: make a login form
      // will get the email and password
      <div className="formContainer">
        <Form onSubmit={this.handleSubmit} className={classes.container}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            className={classes.root}
          >
            <TextField
              id="email"
              label="Email"
              defaultValue="Use the email you signed up with!"
              variant="outlined"
              className={classes.textField}
              margin="normal"
              value={email}
              required
              onChange={this.handleChange}
            />

            <TextField
              id="password"
              label="Password"
              variant="outlined"
              value={password}
              type="password"
              className={classes.textField}
              margin="normal"
              required
              onChange={this.handleChange}
            />
          // TODO Add an option to reset password/register
            <Button
              block
              variant="contained"
              type="submit"
              className={classes.button}
            >
              Submit
            </Button>
          </Grid>
        </Form>
      </div>
    );
  }
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
