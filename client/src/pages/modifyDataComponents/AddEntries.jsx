import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import EntryForm from './entriesComponents/EntryForm';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import uuid from 'uuid/v4';

// TODO: remove empty entries except first
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class AddEntries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionSummary : [{
        experience: "",
        pointIntro: "",
        randomKey: uuid(),
      }],
      sectionOfResume: "",
      subtopicOfSection: "",
      location: "",
      topicOfSection: "",
      entryType: "",
      startPeriod: {
        month: "",
        day: '',
        year: '',
      },
      endingPeriod: {
        month: "",
        day: '',
        year: '',
      },
      checkInProgress: false,
    }
  };

  clearInformation = () => {
    this.setState({
      sectionSummary : [{
        experience: "",
        pointIntro: "",
      }],
      sectionOfResume: "",
      subtopicOfSection: "",
      location: "",
      topicOfSection: "",
      entryType: "",
      startPeriod: {
        month: "",
        day: '',
        year: '',
      },
      endingPeriod: {
        month: "",
        day: '',
        year: '',
      },
      checkInProgress: false,
    });
  };

  handleChange = name => event => {
    if ("experience" === name || "pointIntro" === name) {
      let sectionSummary = [...this.state.sectionSummary];
      sectionSummary[event.target.id][event.target.name] = event.target.value;
      this.setState({
        sectionSummary,
      });
    } else if ("startPeriod" === name || "endingPeriod" === name) {
        let tempPeriod = this.state[name];
        tempPeriod[event.target.name] = event.target.value;
        this.setState({
          [name]: tempPeriod,
        });
    } else if ("checkInProgress" === name) {
      this.setState({
        checkInProgress: event.target.checked,
      })
    } else {
      this.setState({
        [name]: event.target.value,
      });
    }
  };

  removeExp = name => event => {
    const {
      sectionSummary,
    } = this.state;
    sectionSummary.splice(name, 1);
    this.setState({
      sectionSummary,
    })
  };
  // will add a new entry and result in a new textfield
  addExp = event => {
    const emptyPoint = {
      experience: "",
      pointIntro: "",
      randomKey: uuid(),
    };
    this.setState((prevState) => ({
      sectionSummary: [...prevState.sectionSummary, emptyPoint],
    }));
  };

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const {
        sectionSummary,
        sectionOfResume,
        subtopicOfSection,
        location,
        topicOfSection,
        entryType,
        startPeriod,
        endingPeriod,
        checkInProgress,
      } = this.state;
      // do not save other parts in the section
      if (entryType === "Paragraph") {
        sectionSummary.splice(1);
      }
      if (checkInProgress === true) {
        endingPeriod.month = "Present";
      }
      const addNewEntry = {
        sectionSummary,
        sectionOfResume,
        subtopicOfSection,
        location,
        topicOfSection,
        entryType,
        startPeriod,
        endingPeriod,
      }

        // TODO: MAKE SURE IT'S ONLY NUMBERS OR CHANGE HOW IT WORKS CURRENTLY
      const response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:2002/additionalEntry',
        data: addNewEntry,
        withCredentials: true,
      });
      if (response.data.isSuccessful) {
        this.clearInformation();
      } else if (!response.data.isAuthenticated) {
        // TODO: redirect user to login
      } else {
        // TODO: CHeck if user is still signed in / if entry is isSuccessful / if error
      }
    } catch(error) {

    }

  };

  render() {
    const {
      classes
    } = this.props;
    const {
      location,
      entryType,
      startPeriod,
      endingPeriod,
      topicOfSection,
      sectionSummary,
      sectionOfResume,
      subtopicOfSection,
      checkInProgress,
    } = this.state;
    return (
      <form
        onSubmit={this.handleSubmit}
        className={classes.container}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="stretch"
          className={classes.root}
        >
          <h1> Entries</h1>
          <Button
            variant="contained"
            type="submit"
            className={classes.button}
          >
            Add Experience
          </Button>
        </Grid>
        <EntryForm
          entryType={entryType}
          location={location}
          startPeriod={startPeriod}
          endingPeriod={endingPeriod}
          topicOfSection={topicOfSection}
          sectionSummary={sectionSummary}
          checkInProgress={checkInProgress}
          sectionOfResume={sectionOfResume}
          subtopicOfSection={subtopicOfSection}
          addExp={this.addExp.bind(this)}
          removeExp={this.removeExp.bind(this)}
          handleChange={this.handleChange.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)} // Will remove and have a button on top
        />
      </form>
    )
  };
};


AddEntries.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddEntries);
