import React, { Component } from 'react';

export default class BulletListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      {sectionSummary.map((val, idx) => {
            return (
              <Grid
                container
                className={classes.container}
                key={uuid()}
              >
                { pointType === "intropoint" && (
                  <TextField
                    label="Label"
                    name="pointIntro"
                    id={idx.toString()}
                    value={sectionSummary[idx].pointIntro}
                    className={classes.textField}
                    margin="normal"
                    onChange={handleChange}
                  />
                )}
                <TextField
                  label="Point"
                  name="experience"
                  id={idx.toString()}
                  value={sectionSummary[idx].experience}
                  className={classes.textField}
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
            );
      })}
    )
  }
};
