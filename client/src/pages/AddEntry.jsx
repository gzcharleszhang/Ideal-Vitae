import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import './form.css'

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

class AddEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionSummary : [{ experience : "" }],
      topicOfSection: "",
      titleAndPosition: "",
      location: "",
      subtopicOfSection: "",
      pointForm: true,
    }
  };

  handleChange = event => {
      if ("experience" === event.target.name) {
        let sectionSummary = [...this.state.sectionSummary]
        sectionSummary[event.target.id][event.target.name] = event.target.value;
        this.setState({ sectionSummary });
      } else {
        this.setState({ [event.target.id]: event.target.value })
      }
    }

  // will add a new entry and result in a new textfield
  addExp = (e) => {
      this.setState((prevState) => ({
        sectionSummary: [...prevState.sectionSummary, { experience : "" }],
      }));
  }

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const addNewEntry = {
        sectionSummary : this.state.sectionSummary,
        topicOfSection: this.state.topicOfSection,
        titleAndPosition: this.state.titleAndPosition,
        location: this.state.location,
        subtopicOfSection: this.state.subtopicOfSection,
        pointForm: this.state.pointForm,
      }

      const response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:2002/additionalEntry',
        data: addNewEntry,
        withCredentials: true,
      });
      console.log("We got the the entry");
      if (response.isSuccessful) {

      } else {

      }
    } catch(error) {

    }

  }

  render() {
    const { classes } = this.props;
    const { sectionSummary,
            topicOfSection,
            titleAndPosition,
            location,
            subtopicOfSection } = this.state;
    return (
      <div
        className="formContainer"
      >
        <form
          onSubmit={this.handleSubmit}
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
              onChange={this.handleChange}
              required
            />
            <TextField
              id="subtopicOfSection"
              label="Subtopic of Section"
              value={subtopicOfSection}
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange}
              required
            />
            <TextField
              id="titleAndPosition"
              label="Title and/or Position"
              value={titleAndPosition}
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange}
              required
            />
            <TextField
              id="location"
              label="Location"
              value={location}
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange}
              required
            />
            <Button
              variant="contained"
              onClick={this.addExp}
              className={classes.button}> Add More Points</Button>
            {sectionSummary.map((val, idx) => {
                return (
                    <TextField
                      label="Experience"
                      name="experience"
                      id={idx.toString()}
                      key={idx}
                      value={sectionSummary[idx].experience}
                      className={classes.textField}
                      margin="normal"
                      onChange={this.handleChange}
                    />
                );
            })}
            <Button
              variant="contained"
              type="submit"
              className={classes.button}
            >
              Add Experience
            </Button>
          </Grid>
        </form>
      </div>
    )
  };
};

AddEntry.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddEntry);
