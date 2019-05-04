import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { monthOptions, dayOptions } from './DateMenuOptions';

// TODO: Export the textField?

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class DateTextFields extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes,
      disabled,
      position,
      handleChange,
      chosenPeriod,
      onChangeValue,
      changedPeriod,
    } = this.props;
    // get the props to have the id/name/label
    return (
      <Grid
        container
        direction="row"
      >
        <TextField
          id={chosenPeriod}
          name="month"
          label={position + "Month"}
          value={changedPeriod.month}
          className={classes.textField}
          margin="normal"
          onChange={handleChange(onChangeValue)}
          variant="outlined"
          select
          InputLabelProps={{
            shrink: true,
          }}
          disabled={disabled}
        >
          {monthOptions}
        </TextField>
        <TextField
          id={chosenPeriod}
          name="day"
          label={position + "Day"}
          value={changedPeriod.day}
          className={classes.textField}
          margin="normal"
          onChange={handleChange(onChangeValue)}
          variant="outlined"
          type="number"
          select
          InputLabelProps={{
            shrink: true,
          }}
          disabled={disabled}
        >
          {dayOptions}
        </TextField>
        <TextField
          id={chosenPeriod}
          name="year"
          label={position + "Year"}
          value={changedPeriod.year}
          className={classes.textField}
          margin="normal"
          onChange={handleChange(onChangeValue)}
          variant="outlined"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          required={!(changedPeriod.day === '' && changedPeriod.month === '')}
          disabled={disabled}
        />
      </Grid>
    )
  }
};

DateTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DateTextFields);
