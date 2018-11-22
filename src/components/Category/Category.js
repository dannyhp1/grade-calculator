import React, {Component} from 'react';
import { 
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

var cardStyle = {
  height: 'auto',
  margin: '15px 15px',
  transitionDuration: '0.3s',
}

class Category extends Component {
  constructor (props) {
    super(props);
    this.state = this.getState();
  };

  getState() {
    const state = {
      categoryName: this.props.categoryName,
      categoryWeight: this.props.categoryWeight,
      openNewData: false,
      newDataAssignment: '',
      newDataScore: 0.0,
      newDataMax: 0.0,

      openCurrentData: false,
      selectedDataAssignment: '',
      selectedDataScore: 0.0,
      selectedDataMax: 0.0,
      selectedDataNewName: '',
      selectedDataNewScore: 0.0,
      selectedDataNewMax: 0.0,
    }
    return state;
  }

  renderData = () => {
    const dataSet = this.props.dataSet[this.props.categoryName];

    return dataSet.map((data, index) => (
      <TableRow onClick={() => this.handleOpenCurrentData(data.assignmentName, data.assignmentScore, data.assignmentMaxScore)} 
                style={{cursor: 'pointer'}} key={index}>
        <TableCell>{data.assignmentName}</TableCell>
        <TableCell numeric>{data.assignmentScore}</TableCell>
        <TableCell numeric>{data.assignmentMaxScore}</TableCell>
      </TableRow>
    ));
  }

  // --- HANDLING MODIFYING CURRENT ASSIGNMENT ---
  handleOpenCurrentData = (assignmentName, assignmentScore, assignmentMax) => {
    this.setState({ 
      openCurrentData: true,
      selectedDataAssignment: assignmentName,
      selectedDataScore: assignmentScore,
      selectedDataMax: assignmentMax,
      selectedDataNewName: assignmentName,
      selectedDataNewScore: assignmentScore,
      selectedDataNewMax: assignmentMax,
    });
  }

  handleCloseCurrentData = () => {
    this.setState( { openCurrentData: false } );
  }

  handleModification = (e, field) => {
    switch(field) {
      case 'assignmentName':
        this.setState( { selectedDataNewName: e.target.value } )
        break;
      case 'assignmentScore':
        this.setState( { selectedDataNewScore: e.target.value } )
        break;
      case 'assignmentMaxScore':
        this.setState( { selectedDataNewMax: e.target.value } )
        break;
      default:
        break;
    }
  }

  verifyChanges = (assignmentName, assignmentScore, assignmentMaxScore) => {
    if(assignmentName === '') {
      alert('You cannot leave the assignment name empty!');
      return false;
    } else if(assignmentScore < 0) {
      alert('You cannot get a negative score on your assignment!');
      return false;
    } else if(assignmentMaxScore < 0) {
      alert('The assignment cannot be worth less than 0 points!');
      return false;
    } else if(isNaN(assignmentScore)) {
      alert('You must specify a score you received on this assignment.');
      return false;
    } else if(isNaN(assignmentMaxScore)) {
      alert('You must specify the maximum score on this assignment.');
      return false;
    }

    return true;
  }

  submitChanges = (request) => {
    switch(request) {
      case 'delete':
        // console.log('You want to delete assignmentName: ' + this.state.selectedDataAssignment);
        // Delete assignment here.
        break;
      case 'change':
        // If absolutely no changes were made and the user just clicked save, don't do anything.
        if(this.state.selectedDataAssignment === this.state.selectedDataNewName &&
           parseFloat(this.state.selectedDataScore) === parseFloat(this.state.selectedDataNewScore) &&
           parseFloat(this.state.selectedDataMax) === parseFloat(this.state.selectedDataNewMax)) {
          this.handleCloseCurrentData();
        } else {
          // Handle changes here!
          if(this.verifyChanges(this.state.selectedDataNewName, this.state.selectedDataNewScore, this.state.selectedDataNewMax)) {
            // The changes are valid!
            this.handleCloseCurrentData();
          }
        }

        break;
      default:
        break;
    }
  }


  // --- HANDLING ADDING NEW ASSIGNMENT ---
  handleOpenNewData = () => {
    this.setState( { openNewData: true } );
  }

  handleCloseNewData = () => {
    this.setState( { openNewData: false } );
  }

  handleNewChange = (e, field) => {
    switch(field) {
      case 'assignmentName':
        this.setState( { newDataAssignment: e.target.value } )
        break;
      case 'assignmentScore':
        this.setState( { newDataScore: e.target.value } )
        break;
      case 'assignmentMaxScore':
        this.setState( { newDataMax: e.target.value } )
        break;
      default:
        break;
    }
  }

  checkDataFields = () => {
    const assignmentName = this.state.newDataAssignment.trim();
    const assignmentScore = parseFloat(this.state.newDataScore);
    const assignmentMaxScore = parseFloat(this.state.newDataMax);

    if(assignmentName === '') {
      alert('You cannot add an assignment with an empty name!');
    } else if(assignmentScore < 0) {
      alert('You cannot get a negative score on your assignment!');
    } else if(assignmentMaxScore < 0) {
      alert('The assignment cannot be worth less than 0 points!');
    } else if(isNaN(assignmentScore)) {
      alert('You must specify a score you received on this assignment.');
    } else if(isNaN(assignmentMaxScore)) {
      alert('You must specify the maximum score on this assignment.');
    } else {
      this.handleCloseNewData();
      this.props.addData(this.state.categoryName, assignmentName, assignmentScore, assignmentMaxScore);
    }
  }

  render() {
    return (
      <div>
        <Card style={cardStyle}>
          <CardContent>
            <Grid container
                  style={{ textAlign: 'left' }}
                  justify='space-between'
                  spacing={24}>
              <Button color='inherit' 
                      style={{ height: 40, cursor: 'default', backgroundColor: 'transparent'}} 
                      disableTouchRipple={true}>
                  {this.state.categoryName} ({this.state.categoryWeight}%)
              </Button>
              <Button onClick={this.handleOpenNewData} style={{ height: 40 }}>
                <AddIcon style={{ color: '#2979ff' }}/>
              </Button>
            </Grid>
            <Table style={{ width: 350, display: 'block' }}>
              <TableHead>
                <TableRow>
                  <TableCell>Assignment</TableCell>
                  <TableCell numeric>Score</TableCell>
                  <TableCell numeric>Max Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.renderData()}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Diaglogue for adding a brand new assignment! */}
        <Dialog
          open={this.state.openNewData}
          onClose={this.handleCloseNewData}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add New Assignment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new assignment to {this.state.categoryName}, please enter
              the assignment name, the score you received and the maximum score
              possible.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="assignmentName"
              label="Assignment Name"
              type="text"
              required={true}
              onChange={(e) => this.handleNewChange(e, 'assignmentName')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="assignmentScore"
              label="Your Score"
              type="number"
              inputProps={{ min: '0', step: '0.5' }}
              required={true}
              onChange={(e) => this.handleNewChange(e, 'assignmentScore')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="assignmentMaxScore"
              label="Maximum Score"
              type="number"
              inputProps={{ min: '0', step: '0.5' }}
              required={true}
              onChange={(e) => this.handleNewChange(e, 'assignmentMaxScore')}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseNewData} color="primary">
              Cancel
            </Button>
            <Button onClick={this.checkDataFields} color="primary">
              Add Assignment
            </Button>
          </DialogActions>
        </Dialog>

        {/* Diaglogue for modifying current assignment! */}
        <Dialog
          open={this.state.openCurrentData}
          onClose={this.handleCloseCurrentData}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Modifying assignment: {this.state.selectedDataAssignment}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To <strong>modify</strong> this assignment, please enter any changes 
              you would like to make.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="assignmentName"
              label="Assignment Name"
              type="text"
              value={this.state.selectedDataNewName}
              required={true}
              onChange={(e) => this.handleModification(e, 'assignmentName')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="assignmentScore"
              label="Your Score"
              type="number"
              inputProps={{ min: '0', step: '0.5' }}
              value={this.state.selectedDataNewScore}
              required={true}
              onChange={(e) => this.handleModification(e, 'assignmentScore')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="assignmentMaxScore"
              label="Maximum Score"
              type="number"
              inputProps={{ min: '0', step: '0.5' }}
              value={this.state.selectedDataNewMax}
              required={true}
              onChange={(e) => this.handleModification(e, 'assignmentMaxScore')}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseCurrentData} color="primary">
              Cancel
            </Button>
            <Button onClick={(e) => this.submitChanges('delete')} color="primary">
              Delete Assignment
            </Button>
            <Button onClick={(e) => this.submitChanges('change')} color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  }
}

export default Category;