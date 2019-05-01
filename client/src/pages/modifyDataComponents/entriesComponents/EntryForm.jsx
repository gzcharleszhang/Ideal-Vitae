import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItems from './ListItems';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ParagraphItem from './ParagraphItem.jsx';

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

// import this
const months = [
  "",
  "Janurary",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const listOfEntryTypes = [
  "List",
  "Paragraph",
  "PrefixSuffix",
].map(option => (<MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
                ));

const listOfMonths = (months.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                     )));

                     // TODO: EXPORT THIS
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
      startPeriod,
      endingPeriod,
      sectionSummary,
      sectionOfResume,
      subtopicOfSection,
      location,
      entryType,
      topicOfSection,
    } = this.props;
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        className={classes.root}
      >
        <TextField
          id="sectionOfResume"
          label="Section"
          value={sectionOfResume}
          className={classes.textField}
          margin="normal"
          onChange={handleChange("sectionOfResume")}
          variant="outlined"
          required
        />
        <TextField
          id="topicOfSection"
          label="Topic Of Section"
          value={topicOfSection}
          className={classes.textField}
          margin="normal"
          onChange={handleChange("topicOfSection")}
          variant="outlined"
        />
        <TextField
          id="subtopicOfSection"
          label="Subtopic Of Section"
          value={subtopicOfSection}
          className={classes.textField}
          margin="normal"
          onChange={handleChange("subtopicOfSection")}
          variant="outlined"
        />
        <Grid
          container
          direction="row"
        >
          <TextField
            id="startPeriod"
            name="month"
            label="Start Month"
            value={startPeriod.month}
            className={classes.textField}
            margin="normal"
            onChange={handleChange("startPeriod")}
            variant="outlined"
            select
          >
            {listOfMonths}
          </TextField>
          <TextField
            id="startPeriod"
            name="day"
            label="Start Day"
            value={startPeriod.day}
            className={classes.textField}
            margin="normal"
            onChange={handleChange("startPeriod")}
            variant="outlined"
            type="number"
          />
          <TextField
            id="startPeriod"
            name="year"
            label="Start Year"
            value={startPeriod.year}
            className={classes.textField}
            margin="normal"
            onChange={handleChange("startPeriod")}
            variant="outlined"
            type="number"
          />
        </Grid>
        <Grid
          container
          direction="row"
        >
          <TextField
            id="endingPeriod"
            name="month"
            label="End Month"
            value={endingPeriod.month}
            className={classes.textField}
            margin="normal"
            onChange={handleChange("endingPeriod")}
            variant="outlined"
            select
          >
            {listOfMonths}
          </TextField>
          <TextField
            id="endingPeriod"
            name="day"
            label="End Day"
            value={endingPeriod.day}
            className={classes.textField}
            margin="normal"
            onChange={handleChange("endingPeriod")}
            variant="outlined"
            type="number"
          />
          <TextField
            id="endingPeriod"
            name="year"
            label="End Year"
            value={endingPeriod.year}
            className={classes.textField}
            margin="normal"
            onChange={handleChange("endingPeriod")}
            variant="outlined"
            type="number"
          />
        </Grid>
        <FormControlLabel
          className={classes.textField}
          control={
            <Checkbox
            />
          }
          label="Still in progress"
        />
        <TextField
          id="location"
          label="Location"
          value={location}
          className={classes.textField}
          margin="normal"
          onChange={handleChange("location")}
          variant="outlined"
        />
        <TextField
          id="entryType"
          value={entryType}
          label="Point Format"
          className={classes.textField}
          margin="normal"
          onChange={handleChange("entryType")}
          variant="outlined"
          select
        >
          {listOfEntryTypes}
        </TextField>
        { entryType === "Paragraph" && (
            <ParagraphItem
              sectionSummary={sectionSummary}
              handleChange={handleChange}
            />
        )}
        { entryType === "List" && (
            <ListItems
              sectionSummary={sectionSummary}
              handleChange={handleChange}
            />

        )}
      </Grid>
    );
  }
}

EntryForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EntryForm);
