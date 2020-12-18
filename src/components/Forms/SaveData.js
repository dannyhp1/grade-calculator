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

class SaveData extends React.Component {
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
          Save your data:
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide a username to store your data.

            <br />
            <br />

            <strong>Note: </strong> Anyone can use your username to load your data, so make it unique!
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

export default SaveData;