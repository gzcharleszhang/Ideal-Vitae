import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

export default class ParagraphItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      sectionSummary,
      handleChange,
    } = this.props;
    return (
      <TextField
        label="Point"
        name="experience"
        id={"0"}
        value={sectionSummary[0].experience}
        margin="normal"
        onChange={handleChange("experience")}
        style={{ margin: 8 }}
        fullWidth
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
    )
  }
};

// TODO: More point Format
// TODO: make the dates a component + get the update to work with Checkbox
// TODO: Make a list component for month and format type since it will be reused
// TODO: Tab and create contact + start view entry
// TODO: Add the new experience button beside the point format // only appears for some format
// TODO: Make this box bigger
// TODO: Login and Register should be broken down
