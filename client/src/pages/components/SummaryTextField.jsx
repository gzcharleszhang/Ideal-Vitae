import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import uuid from 'uuid/v4';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  }
});

class SummaryTextField extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {
      classes,
      pointType,
      handleChange,
      sectionSummary,
    } = this.props;
    return (
      <div
        className={classes.root}
      >
        {sectionSummary.map((val, idx) => {
            return (
              <Grid
                container
                className={classes.container}
                key={uuid()}
              >
                { pointType === "intropoint" && (
                  <TextField
                    label="Label"
                    name="pointIntro"
                    id={idx.toString()}
                    value={sectionSummary[idx].pointIntro}
                    className={classes.textField}
                    margin="normal"
                    onChange={handleChange}
                  />
                )}
                <TextField
                  label="Point"
                  name="experience"
                  id={idx.toString()}
                  value={sectionSummary[idx].experience}
                  className={classes.textField}
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
            );
        })}
      </div>
    );
  }
};

SummaryTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SummaryTextField);