import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import EntryForm from './components/EntryForm'
import PropTypes from 'prop-types';
import './form.css'

export default class AddEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionSummary : [],
      topicOfSection: "",
      titleAndPosition: "",
      location: "",
      subtopicOfSection: "",
      pointType: "paragraph",
      startPeriod: "",
      endingPeriod: "",
    }
  };

  handleSelectChange = event => {
      this.setState({
        pointType: event.target.value,
      });
  }

  handleChange = event => {
      if ("experience" === event.target.name || "pointIntro" === event.target.name ) {
        let sectionSummary = [...this.state.sectionSummary]
        sectionSummary[event.target.id][event.target.name] = event.target.value;
        this.setState({
          sectionSummary,
        });
      } else {
        this.setState({
          [event.target.id]: event.target.value,
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
        topicOfSection,
        titleAndPosition,
        location,
        subtopicOfSection,
        pointType,
        startPeriod,
        endingPeriod,
      } = this.state;
      const addNewEntry = {
        sectionSummary,
        topicOfSection,
        titleAndPosition,
        location,
        subtopicOfSection,
        pointType,
        startPeriod,
        endingPeriod,
      }

      const response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:2002/additionalEntry',
        data: addNewEntry,
        withCredentials: true,
      });
      if (response.isSuccessful) {

      } else {
// work in progress
      }
    } catch(error) {

    }

  }

  render() {
    const {
      sectionSummary,
      topicOfSection,
      titleAndPosition,
      location,
      subtopicOfSection,
      pointType,
      startPeriod,
      endingPeriod,
    } = this.state;
    return (
      <div
        className="formContainer"
      >
        <select onChange={this.handleSelectChange} >
          <option value="paragraph">Paragraph</option>
          <option value="point">Bulleted List</option>
          <option value="nopoint">Simple List</option>
          <option value="intropoint">Label and Point</option>
        </select>
        <EntryForm
          location={location}
          pointType={pointType}
          startPeriod={startPeriod}
          endingPeriod={endingPeriod}
          sectionSummary={sectionSummary}
          topicOfSection={topicOfSection}
          titleAndPosition={titleAndPosition}
          subtopicOfSection={subtopicOfSection}
          addExp={this.addExp.bind(this)}
          handleChange={this.handleChange.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
        />
      </div>
    )
  };
};
