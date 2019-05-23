import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from '@material-ui/core';

class NewAssignment extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      score: -1,
      max: -1,
    };
  };

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

  checkScore = () => {
    const score = this.state.score;
    return (score >= 0);
  }

  changeScore = (e) => {
    const score = parseFloat(e.target.value);

    this.setState({
      ...this.state,
      score: score,
    });
  }

  checkMax = () => {
    const max = this.state.max;
    return (max >= 0);
  }

  changeMax = (e) => {
    const max = parseFloat(e.target.value);

    this.setState({
      ...this.state,
      max: max,
    });
  }

  submitForm = () => {
    if(this.checkName() && this.checkScore() && this.checkMax()) {
      this.props.submit(this.state.name, this.state.score, this.state.max);
    } else {
      alert('Please ensure that your input values are correct.');
    }
  }

  render() {
    /* Only display if user clicks on new category. */
    return (
      <Dialog open={this.props.show} onClose={this.props.close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Adding a new assignment:
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new assignment, provide a name, score, and maximum score.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Assignment Name"
            type="text"
            required={true}
            onChange={(e) => this.changeName(e)}
            // onKeyPress={(e) => this.handleKeyPress(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="weight"
            label="Score"
            type="number"
            inputProps={{ min: '0', step: '0.5' }}
            placeholder="90"
            required={true}
            onChange={(e) => this.changeScore(e)}
            // onKeyPress={(e) => this.handleKeyPress(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="weight"
            label="Maximum"
            type="number"
            inputProps={{ min: '0', step: '0.5' }}
            placeholder="100"
            required={true}
            onChange={(e) => this.changeMax(e)}
            // onKeyPress={(e) => this.handleKeyPress(e)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.close} color="primary">
            Cancel
          </Button>
          <Button onClick={this.submitForm} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default NewAssignment;