import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import AddEntries from './modifyDataComponents/AddEntries';
import './form.css';

export default class AddData extends Component {
  constructor(props) {
    super(props);
  };

  render() {

    return (
      <div
        className="formContainer"
      >
      {/* Insert tab for adding entries and adding contacts */}
        <AddEntries />
      </div>
    )
  };
};
