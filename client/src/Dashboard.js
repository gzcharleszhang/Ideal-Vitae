import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="stretch"
          >
          <Button variant="outlined" size="large" color="primary" className={classes.margin}>
            New Entries
          </Button>
          <Button variant="outlined" size="large" color="primary" className={classes.margin}>
            Edit Information
          </Button>
          <Button variant="outlined" size="large" color="primary" className={classes.margin}>
            Generate Resume
          </Button>

        </Grid>
      </div>
    )
  }
};

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
