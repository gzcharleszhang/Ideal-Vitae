import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ViewEntriesList from './entriesComponents/ViewEntriesList'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

export default class DisplayEntries extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      resumeEntry,
    } = this.props;
    return (
      <ViewEntriesList
        resumeEntry={resumeEntry}
      />
    );
  }
}
