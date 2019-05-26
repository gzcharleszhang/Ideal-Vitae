import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ViewListItems from './ViewListItems';
import ViewDate from './ViewDate'
import './EntriesItem.css'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    flexGrow: 1,
  },
});

class ViewEntriesItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes,
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
      <Button
        variant="outlined"
        className={classes.root}
      >
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          className={classes.root}
        >
          <h2>Section: {sectionOfResume} </h2>
          <h2>Topic: {topicOfSection} </h2>
          <h2>Subtopic: {subtopicOfSection}</h2>
          <ViewDate
            startPeriod={startPeriod}
            endingPeriod={endingPeriod}
          />
          <h2>Location: {location}</h2>
          <h2>Entries: </h2>
          { entryType === "Paragraph" && (
            <h2> {sectionSummary[0].experience} </h2>
          )}
          { entryType === "PrefixSuffix" || entryType === "List" && (
            <ViewListItems
              entryType={entryType}
              sectionSummary={sectionSummary}
            />
          )}
        </Grid>
      </Button>
    );
  }
}

ViewEntriesItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewEntriesItem);
