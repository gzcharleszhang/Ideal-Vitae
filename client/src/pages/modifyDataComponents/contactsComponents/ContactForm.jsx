import React, { Component } from 'react';
import WrapTextField from '../WrapTextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    flexGrow: 1,
  },
});

class ContactForm extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const {
      classes,
      handleChange,
      contactInfo,
      contactType,
      checkInProgress,
    } = this.props;
    return (
      <Grid
        container
        direction="column"
        justify="center"
        className={classes.root}
      >
        <div
          className={classes.container}
        >
          <Grid
            container
            direction="row"
            alignItems="stretch"
          >
            <WrapTextField
              id="contactType"
              label="Type"
              value={contactType}
              handleChange={handleChange}
              onChangeValue="contactType"
              required={true}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkInProgress}
                  onChange={handleChange('checkInProgress')}
                  value="checkInProgress"
                />
              }
              label="Required on Resume"
            />
          </Grid>
          <WrapTextField
            id="contactInfo"
            label="Contact Info"
            value={contactInfo}
            handleChange={handleChange}
            onChangeValue="contactInfo"
            required={true}
            fullWidth={true}
          />
        </div>
      </Grid>
    )
  };
};

ContactForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactForm);
