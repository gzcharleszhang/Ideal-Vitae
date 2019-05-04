import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import WrapTextField from '../WrapTextField';

export default class ParagraphItem extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const {
      sectionSummary,
      handleChange,
    } = this.props;
    return (
      <WrapTextField
        label="Point"
        name="experience"
        id={"0"}
        value={sectionSummary[0].experience}
        onChangeValue="experience"
        handleChange={handleChange}
      />
    )
  };
};

// TODO: Tab and create contact + start view entry
// TODO: Make this box bigger
// TODO: Login and Register should be broken down

// TODO: More point Format
