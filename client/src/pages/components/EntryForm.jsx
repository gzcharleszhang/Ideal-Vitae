import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SummaryTextField from './SummaryTextField';

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

class EntryForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes,
      addExp,
      handleSubmit,
      handleChange,
      sectionSummary,
      topicOfSection,
      titleAndPosition,
      location,
      subtopicOfSection,
      pointType,
    } = this.props;
    return (
      <form
        onSubmit={handleSubmit}
        className={classes.container}
      >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
          className={classes.root}
        >
          <TextField
            id="topicOfSection"
            label="Topic of Section"
            value={topicOfSection}
            className={classes.textField}
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            id="subtopicOfSection"
            label="Subtopic of Section"
            value={subtopicOfSection}
            className={classes.textField}
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            id="titleAndPosition"
            label="Title and/or Position"
            value={titleAndPosition}
            className={classes.textField}
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            id="location"
            label="Location"
            value={location}
            className={classes.textField}
            margin="normal"
            onChange={handleChange}
            required
          />
          <Button
            variant="contained"
            onClick={addExp}
            className={classes.button}
          >
            Add More Points
          </Button>
          <SummaryTextField
            pointType={pointType}
            sectionSummary={sectionSummary}
            handleChange={handleChange}
          />
          <Button
            variant="contained"
            type="submit"
            className={classes.button}
          >
            Add Experience
          </Button>
        </Grid>
      </form>
    );
  }
}

EntryForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EntryForm);
