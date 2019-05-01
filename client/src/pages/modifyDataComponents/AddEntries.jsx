import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import EntryForm from './entriesComponents/EntryForm'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class AddEntries extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    })
  }
  handleChange = name => event => {
    // need to add an option to handle the start date  and figure out how to made year madatory if any change is made
    // OR MAKE A DATE CLASS
    if ("experience" === name || "pointIntro" === name) {
      let sectionSummary = [...this.state.sectionSummary];
      console.log(sectionSummary);
      sectionSummary[event.target.id][event.target.name] = event.target.value;
      this.setState({
        sectionSummary,
      });
      console.log(sectionSummary);
    } else if ("startPeriod" === name || "endingPeriod" === name) {
        let tempPeriod = this.state[name];
        tempPeriod[event.target.name] = event.target.value;
        this.setState({
          [name]: tempPeriod,
        });
    } else {
      this.setState({
        [name]: event.target.value,
      });
    }
  }

  // will add a new entry and result in a new textfield
  addExp = event => {
    const emptyPoint = {
      experience: "",
      pointIntro: "",
    };
    this.setState((prevState) => ({
      sectionSummary: [...prevState.sectionSummary, emptyPoint],
    }));
  }

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
      } = this.state;
      if (sectionOfResume.trim() === "") {
        return;
      }
      // do not save other parts in the section
      if (entryType === "Paragraph") {
        sectionSummary = sectionSummary[0];
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
      console.log(response);
      if (response.data.isSuccessful) {
        this.clearInformation();
      } else {
// work in progress and check if logged in
      }
    } catch(error) {

    }

  }

  render() {
    const {
      classes
    } = this.props;
    const {
      sectionSummary,
      sectionOfResume,
      subtopicOfSection,
      location,
      topicOfSection,
      startPeriod,
      endingPeriod,
      entryType,
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
            onClick={this.handleSubmit}
            className={classes.button}
          >
            Add Experience
          </Button>
        </Grid>
        <EntryForm
          location={location}
          entryType={entryType}
          startPeriod={startPeriod}
          endingPeriod={endingPeriod}
          sectionSummary={sectionSummary}
          sectionOfResume={sectionOfResume}
          topicOfSection={topicOfSection}
          subtopicOfSection={subtopicOfSection}
          addExp={this.addExp.bind(this)}
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
