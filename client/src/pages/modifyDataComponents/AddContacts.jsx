import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ContactForm from './contactsComponents/ContactForm';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class AddContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactInfo: '',
      contactType: '',
      checkInProgress: false,
    };
  }

  clearContacts = () => {
    this.setState({
      contactInfo: '',
      contactType: '',
      checkInProgress: false,
    });
  }

  handleChange = name => event => {
    if ("checkInProgress" === name) {
      this.setState({
        checkInProgress: event.target.checked,
      });
    } else {
      this.setState({
        [name]: event.target.value,
      });
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const {
        contactInfo,
        contactType,
        checkInProgress,
      } = this.state;
      const addNewContact = {
        contactInfo,
        contactType,
        checkInProgress,
      };
      const response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:2002/additionalContact',
        data: addNewContact,
        withCredentials: true,
      });
      if (response.data.isSuccessful) {
        this.clearContacts();
      } else if (!response.data.isAuthenticated) {
        // TODO: redirect user to login
      } else {
        //if entry is isSuccessful / if error
      }
    } catch(error) {

    }
  }

  render() {
    const {
      classes,
      contactInfo,
      contactType,
      checkInProgress,
    } = this.props;
    return (
      <form
        onSubmit={this.handleSubmit}
        className={classes.root}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="stretch"
          className={classes.root}
        >
          <h1> Contacts</h1>
          <Button
            variant="contained"
            type="submit"
            className={classes.button}
          >
            Add Contact
          </Button>
        </Grid>
        <ContactForm
          contactInfo={contactInfo}
          contactType={contactType}
          checkInProgress={checkInProgress}
          handleChange={this.handleChange.bind(this)}
        />
      </form>
    );
  }
}

AddContacts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddContacts);
