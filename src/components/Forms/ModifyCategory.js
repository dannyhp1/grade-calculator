import React from 'react';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from '@material-ui/core';

class ModifyCategory extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      previousName: this.props.current === null ? '' : this.props.current['name'],
      name: this.props.current === null ? '' : this.props.current['name'],
      weight: this.props.current === null ? 0 : this.props.current['weight'],
    }
  };

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.submitForm();
    }
  }

  checkName = () => {
    const name = this.state.name;
    return name !== null && name !== '';
  }

  changeName = (e) => {
    this.setState({
      ...this.state,
      name: e.target.value,
    });
  }

  checkWeight = () => {
    const weight = this.state.weight;
    /* Need to check if total weight exceeds 100 in the future. */
    return (weight >= 0 && weight <= 100)
  }

  changeWeight = (e) => {
    /* This should work as the form restricts user to numerical values only. */
    const weight = parseFloat(e.target.value);

    this.setState({
      ...this.state,
      weight: weight,
    });
  }

  submitForm = () => {
    if(this.checkName() && this.checkWeight()) {
      this.props.submit(this.state.name, this.state.weight);
    } else {
      alert('Please ensure that your input values are correct.');
    }
  }

  render() {
    return (
      <Dialog open={this.props.show} onClose={this.props.close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Modifying a category:
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are currently making modifications to {this.state.previousName}.

            <br />
            <br />

            <strong>Note: </strong>The weight of the category must be within the range 0 to 100.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            value={this.state.name}
            type="text"
            required={true}
            onChange={(e) => this.changeName(e)}
            onKeyPress={(e) => this.handleKeyPress(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="weight"
            label="Category Weight"
            value={this.state.weight}
            type="number"
            inputProps={{ min: '1', max: '100', step: '0.5' }}
            required={true}
            onChange={(e) => this.changeWeight(e)}
            onKeyPress={(e) => this.handleKeyPress(e)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Grid justify='space-between' spacing={24} style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 5 }} container>
            <Grid item>
              <Button onClick={this.props.delete} color="secondary">
                Delete Category
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={this.props.close} color="primary">
                Cancel
              </Button>
              <Button onClick={this.submitForm} color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ModifyCategory;