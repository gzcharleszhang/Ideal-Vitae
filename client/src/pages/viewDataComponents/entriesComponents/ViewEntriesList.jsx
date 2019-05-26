import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ViewEntriesItem from './ViewEntriesItem';

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 500,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
});

class ViewEntriesList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes,
      resumeEntry,
    } = this.props;
    return (
      <List className={classes.root} subheader={<li />}>
      {resumeEntry.map((val, idx) => {
        const {
          startPeriod,
          endingPeriod,
          sectionSummary,
          sectionOfResume,
          subtopicOfSection,
          location,
          entryType,
          topicOfSection,
          _id,
        } = resumeEntry[idx];
        return (
          <ListItem key={`item-${_id}`}>
            <ViewEntriesItem
              startPeriod={startPeriod}
              endingPeriod={endingPeriod}
              sectionSummary={sectionSummary}
              sectionOfResume={sectionOfResume}
              subtopicOfSection={subtopicOfSection}
              location={location}
              entryType={entryType}
              topicOfSection={topicOfSection}
            />
          </ListItem>
        );
      })}
      </List>
    );
  }
}

ViewEntriesList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewEntriesList);
