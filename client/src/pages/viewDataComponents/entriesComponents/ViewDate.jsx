import React, { Component } from 'react';

export default class ViewDate extends Component {
  constructor(props) {
    super(props);
  }

  convertDates = (dateObj) => {
    let dateString = "";
    if (dateObj.month) {
      dateString = dateObj.month;
      dateString += " ";
    }
    if (dateObj.day) {
      dateString += dateObj.day;
      dateString += ", ";
    }
    if (dateObj.year) {
      dateString += dateObj.year;
    }
    return dateString;
  }

  render() {
    const {
      startPeriod,
      endingPeriod,
    } = this.props;
    const endPeriodString = this.convertDates(endingPeriod);
    const startPeriodString = this.convertDates(startPeriod);
    return (
        <h2>Date: {startPeriodString} {(endPeriodString.trim() != "" && startPeriodString.trim() != "") && `-`}  {endPeriodString}</h2>
    );
  }
}
