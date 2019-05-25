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

class NewCategory extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      weight: -1,
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
    /* Only display if user clicks on new category. */
    return (
      <Dialog open={this.props.show} onClose={this.props.close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Create a new category:
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new category, please specify its name and weight. 
            
            <br />
            <br />

            If 'midterms' are worth 35% of your grade,
            fill in '35' in the weight field.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            placeholder="Homework"
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
            placeholder="10"
            type="number"
            inputProps={{ min: '1', max: '100', step: '0.5' }}
            required={true}
            onChange={(e) => this.changeWeight(e)}
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

export default NewCategory;