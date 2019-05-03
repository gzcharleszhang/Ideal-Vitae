import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ParagraphItem from './ParagraphItem';
import ListItems from './ListItems';
import DateTextFields from './DateTextFields';
import WrapTextField from '../WrapTextField';
import EntryTypeList from './EntryTypeList';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    flexGrow: 1,
  },
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
      startPeriod,
      endingPeriod,
      sectionSummary,
      sectionOfResume,
      subtopicOfSection,
      location,
      entryType,
      topicOfSection,
      checkInProgress,
      removeExp,
    } = this.props;
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        className={classes.root}
      >
        <WrapTextField
          id="sectionOfResume"
          label="Section"
          value={sectionOfResume}
          onChangeValue="sectionOfResume"
          required={true}
          handleChange={handleChange}
        />
        <WrapTextField
          id="topicOfSection"
          label="Topic Of Section"
          value={topicOfSection}
          handleChange={handleChange}
          onChangeValue="topicOfSection"
        />
        <WrapTextField
          id="subtopicOfSection"
          label="Subtopic Of Section"
          value={subtopicOfSection}
          onChangeValue="subtopicOfSection"
          handleChange={handleChange}
        />
        <DateTextFields
          chosenPeriod="startPeriod"
          position="Start "
          onChangeValue="startPeriod"
          handleChange={handleChange}
          changedPeriod={startPeriod}
        />
        <DateTextFields
          chosenPeriod="endingPeriod"
          position="End  "
          onChangeValue="endingPeriod"
          handleChange={handleChange}
          changedPeriod={endingPeriod}
          disabled={checkInProgress}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkInProgress}
              onChange={handleChange('checkInProgress')}
              value="checkInProgress"
            />
          }
          label="Still in progress"
        />
        <WrapTextField
          id="location"
          label="Location"
          value={location}
          handleChange={handleChange}
          onChangeValue="location"
        />
        <EntryTypeList
          id="entryType"
          value={entryType}
          label="Point Format"
          handleChange={handleChange}
          handleChangeValue="entryType"
        />
        { entryType === "Paragraph" && (
            <ParagraphItem
              sectionSummary={sectionSummary}
              handleChange={handleChange}
            />
        )}
        { (entryType === "List" || entryType === "PrefixSuffix") && (
            <ListItems
              sectionSummary={sectionSummary}
              handleChange={handleChange}
              entryType={entryType}
              addExp={addExp}
              removeExp={removeExp}
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
