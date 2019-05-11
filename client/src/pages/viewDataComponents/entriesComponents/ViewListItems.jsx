import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import WrapTextField from '../../../WrapTextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    flexGrow: 1,
  }
});

class ViewListItems extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const {
      classes,
      entryType,
      sectionSummary,
    } = this.props;
    const isPrefixType = (entryType === "PrefixSuffix");
    return (
      <div
        className={classes.root}
      >
      <ul>
        {sectionSummary.map((val, idx) => {
            return (
              <div
                className={classes.container}
              >
                <li
                  key={idx}
                >
                {isPrefixType && sectionSummary[idx].pointIntro}   {sectionSummary[idx].experience}
                </li>
              </div>
            );
        })}
      </ul>
      </div>
    )
  };
};

ViewListItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewListItems);
