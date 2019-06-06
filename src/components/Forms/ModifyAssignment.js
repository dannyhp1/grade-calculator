import React from 'react';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from '@material-ui/core';

class ModifyAssignment extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      name: this.props.current === null ? '' : this.props.current['name'],
      score: this.props.current === null ? '' : this.props.current['score'],
      max: this.props.current === null ? '' : this.props.current['max'],
    };
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
    return (
      <Dialog open={this.props.show} onClose={this.props.close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Modifying an assignment:
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To add a new assignment, provide a name, score, and maximum score.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Assignment Name"
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
            label="Score"
            value={this.state.score}
            type="number"
            inputProps={{ min: '0', step: '0.5' }}
            placeholder="90"
            required={true}
            onChange={(e) => this.changeScore(e)}
            onKeyPress={(e) => this.handleKeyPress(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="weight"
            label="Maximum"
            value={this.state.max}
            type="number"
            inputProps={{ min: '0', step: '0.5' }}
            placeholder="100"
            required={true}
            onChange={(e) => this.changeMax(e)}
            onKeyPress={(e) => this.handleKeyPress(e)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Grid justify='space-between' spacing={24} style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 5 }} container>
            <Grid item>
              <Button onClick={this.props.delete} color="secondary">
                Delete Assignment
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

export default ModifyAssignment;