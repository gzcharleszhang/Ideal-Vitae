import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AddEntries from './modifyDataComponents/AddEntries';
import AddContacts from './modifyDataComponents/AddContacts';
import './form.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class AddData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    }
  };

  handleChange = (event, value) => {
   this.setState({ value });
  };

  handleChangeIndex = index => {
   this.setState({ value: index });
  };

  render() {
    const {
      classes,
    } = this.props;
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
            <AddEntries />
            <AddContacts />
          </SwipeableViews>
        </div>
      </div>
    )
  };
};

AddData.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddData);
