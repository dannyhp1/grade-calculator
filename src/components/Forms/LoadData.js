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

class LoadData extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
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

  submitForm = () => {
    if(this.checkName()) {
      this.props.submit(this.state.name);
    } else {
      alert('Please provide a username.');
    }
  }

  render() {
    return (
      <Dialog open={this.props.show} onClose={this.props.close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Load your data:
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide a username to load data from.

            <br />
            <br />

            <strong>Note: </strong> You must save your data again if you change anything.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            placeholder="mickeymouse"
            type="text"
            required={true}
            onChange={(e) => this.changeName(e)}
            onKeyPress={(e) => this.handleKeyPress(e)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.close} color="primary">
            Cancel
          </Button>
          <Button onClick={this.submitForm} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default LoadData;