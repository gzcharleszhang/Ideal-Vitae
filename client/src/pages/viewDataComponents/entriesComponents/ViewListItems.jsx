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
  button: {
    margin: theme.spacing.unit,
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
        {sectionSummary.map((val, idx) => {
            return (
              <Grid
                container
                direction="row"
                className={classes.container}
                key={idx}
              >
                { isPrefixType && (
                  <h2>{sectionSummary[idx].pointIntro}</h2>
                )}
                <h2>{sectionSummary[idx].experience}</h2>
              </Grid>
            );
        })}
      </div>
    )
  };
};

ViewListItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewListItems);
