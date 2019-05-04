import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});


class WrapTextField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes,
      id,
      label,
      name,
      value,
      onChangeValue,
      required,
      handleChange,
      fullWidth,
    } = this.props;
    return (
      <TextField
        id={id}
        name={name}
        label={label}
        value={value}
        className={classes.textField}
        margin="normal"
        onChange={handleChange(onChangeValue)}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        required={required}
        fullWidth={fullWidth}
      />
    );
  }
}

WrapTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WrapTextField);
