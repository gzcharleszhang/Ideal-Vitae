import React, { Component, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DisplayEntries from './viewDataComponents/DisplayEntries';
import './form.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class DisplayData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      resumeEntry: [],
      contact: [],
    };
  }

  componentDidMount() {
    axios({
      method:'get',
      url:'http://127.0.0.1:2002/displayContactsEntries',
      withCredentials: true,
    })
    .then((response) => {
      if (response.data.isAuthenticated === false) {
        // redirect them
      }
      const {
        contact,
        resumeEntry,
      } = response.data;
      this.setState({
        contact,
        resumeEntry,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleChange = (event, value) => {
   this.setState({ value });
  }

  handleChangeIndex = index => {
   this.setState({ value: index });
  }

  render() {
    const {
      classes,
    } = this.props;
    const {
      resumeEntry,
    } = this.state;
    return (
      <div
        className="formContainer"
      >
        <div
          className={classes.root}
        >
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Entry" />
            <Tab label="Contact" />
          </Tabs>
          <SwipeableViews
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            <DisplayEntries
              resumeEntry={resumeEntry}
            />
            <h1>WIP</h1>
          </SwipeableViews>
        </div>
      </div>
    );
  }
}

DisplayData.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisplayData);
