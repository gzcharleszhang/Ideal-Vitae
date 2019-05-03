import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import WrapTextField from './WrapTextField';

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

class ListItems extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.entryType);
  }

  render() {
    const {
      addExp,
      classes,
      removeExp,
      entryType,
      handleChange,
      sectionSummary,
    } = this.props;
    const isPrefixType = entryType === "PrefixSuffix";
    return (
      <div
        className={classes.root}
      >
        <Button
          variant="contained"
          onClick={addExp}
          className={classes.button}
          fullWidth
        >
          Add New Point
        </Button>
        {sectionSummary.map((val, idx) => {
            return (
              <Grid
                container
                className={classes.container}
                key={sectionSummary[idx].randomKey}
              >
                { idx != 0 && (
                  <Button
                    variant="contained"
                    onClick={removeExp(idx)}
                    className={classes.button}
                  >
                    Delete point:
                  </Button>
                )}
                { isPrefixType && (
                  <WrapTextField
                    label="Label"
                    id={idx.toString()}
                    name="pointIntro"
                    value={sectionSummary[idx].pointIntro}
                    onChangeValue="pointIntro"
                    handleChange={handleChange}
                  />
                )}

                <WrapTextField
                  label="Point"
                  name="experience"
                  id={idx.toString()}
                  value={sectionSummary[idx].experience}
                  handleChange={handleChange}
                  onChangeValue="experience"
                  fullWidth={!isPrefixType}
                />
              </Grid>
            );
        })}
      </div>
    );
  }
};

ListItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItems);
