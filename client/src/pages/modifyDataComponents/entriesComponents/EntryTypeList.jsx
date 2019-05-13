import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const entryTypes = [
  "List",
  "Paragraph",
  "PrefixSuffix",
];

const listOfEntryTypes = entryTypes.map(option => (
  <MenuItem key={option} value={option}>
    {option}
  </MenuItem>
));

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class EntryTypeList extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const {
      id,
      value,
      label,
      classes,
      handleChange,
      handleChangeValue
    } = this.props;
    return (
      <TextField
        id={id}
        value={value}
        label={label}
        className={classes.textField}
        onChange={handleChange(handleChangeValue)}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        select
      >
        {listOfEntryTypes}
      </TextField>
    )
  };
};

EntryTypeList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EntryTypeList);
