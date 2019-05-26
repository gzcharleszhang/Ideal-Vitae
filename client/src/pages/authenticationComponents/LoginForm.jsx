import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import WrapTextField from '../WrapTextField';
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
  },
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      verified: false,
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    try {
      // prepares log in credentials from input
      const {
        username,
        password,
      } = this.state;
      const loginInfo = {
        username,
        password,
      };
      const response = await axios({
        method: 'post',
        //TODO: have a web map thing
        url: 'http://127.0.0.1:2002/login',
        data: loginInfo,
        withCredentials: true,
      });
      if (response.data.isAuthenticated) {
        this.setState({
          verified: true,
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
      username,
      password,
    } = this.state;
    if (verified) {
      return <Redirect to='/dashboard' />;
    }
    return (
      <form
        onSubmit={this.handleSubmit}
        className={classes.container}
      >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
          className={classes.root}
        >
          <WrapTextField
            id="username"
            label="Username"
            value={username}
            required={true}
            onChangeValue="username"
            handleChange={this.handleChange.bind(this)}
          />

          <WrapTextField
            id="password"
            label="Password"
            value={password}
            type="password"
            required={true}
            onChangeValue="password"
            handleChange={this.handleChange.bind(this)}
          />
          {/*TODO Add an option to reset password/register*/}
          <Button
            variant="contained"
            type="submit"
            className={classes.button}
          >
            Submit
          </Button>
        </Grid>
      </form>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);
