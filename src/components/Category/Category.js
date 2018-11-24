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
    const initialState = {
      assignmentID: 0,

      categoryName: this.props.categoryName,
      categoryWeight: this.props.categoryWeight,
      openNewData: false,
      newDataName: '',
      newDataScore: 0.0,
      newDataMax: 0.0,

      openCurrentData: false,
      currentDataName: '',
      currentDataScore: 0.0,
      currentDataMax: 0.0,
      currentDataNewName: '',
      currentDataNewScore: 0.0,
      currentDataNewMax: 0.0,
    }
    return initialState;
  }

  renderData = () => {
    var dataSet = [ ];
    var categoryData = this.props.data;

    for(var [id, assignmentDetails ] of categoryData) {
      dataSet.push({ assignmentID: id, 
                     assignmentName: assignmentDetails.assignmentName,
                     assignmentScore: assignmentDetails.assignmentScore,
                     assignmentMaxScore: assignmentDetails.assignmentMaxScore });
    }

    return dataSet.map((data, index) => (
      <TableRow onClick={() => this.openCurrentDataDialog(data.assignmentID,
                                                          data.assignmentName, 
                                                          data.assignmentScore, 
                                                          data.assignmentMaxScore)} 
                style={{cursor: 'pointer'}} key={index}>
        <TableCell>
          {data.assignmentName}
        </TableCell>
        <TableCell numeric>
          {data.assignmentScore}
        </TableCell>
        <TableCell numeric>
          {data.assignmentMaxScore}
        </TableCell>
      </TableRow>
    ));
  }

  /* Start of opening new data dialog (to create more data). */
  openNewDataDialog = () => {
    this.setState({
      openNewData: true ,
      newDataName: '',
      newDataScore: 0.0,
      newDataMax: 0.0,
    });
  }

  closeNewDataDialog = () => {
    this.setState( { openNewData: false } );
  }

  changeNewData = (e, field) => {
    switch(field) {
      case 'assignmentName':
        this.setState( { newDataName: e.target.value } )
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

  checkNewData = () => {
    const assignmentName = this.state.newDataName.trim();
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
      this.closeNewDataDialog();
      this.props.addData(this.state.categoryName, this.state.assignmentID, assignmentName, assignmentScore, assignmentMaxScore);

      this.setState({
        assignmentID: this.state.assignmentID + 1
      });
    }
  }
  /* End of opening new data dialog (to create more data). */

  /* Start of opening current data dialog (to modify or delete). */
  openCurrentDataDialog = (assignmentName, assignmentScore, assignmentMax) => {
    this.setState({ 
      openCurrentData: true,
      currentDataName: assignmentName,
      currentDataScore: assignmentScore,
      currentDataMax: assignmentMax,
      currentDataNewName: assignmentName,
      currentDataNewScore: assignmentScore,
      currentDataNewMax: assignmentMax,
    });
  }

  closeCurrentDataDialog = () => {
    this.setState( { openCurrentData: false } );
  }

  changeCurrentData = (e, field) => {
    switch(field) {
      case 'assignmentName':
        this.setState( { currentDataNewName: e.target.value } )
        break;
      case 'assignmentScore':
        this.setState( { currentDataNewScore: e.target.value } )
        break;
      case 'assignmentMaxScore':
        this.setState( { currentDataNewMax: e.target.value } )
        break;
      default:
        break;
    }
  }

  verifyCurrentData = (assignmentName, assignmentScore, assignmentMaxScore) => {
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
        // Delete assignment here.
        this.closeCurrentDataDialog();
        break;
      case 'change':
        // If absolutely no changes were made and the user just clicked save, don't do anything.
        if(this.state.currentDataName === this.state.currentDataNewName &&
           parseFloat(this.state.currentDataScore) === parseFloat(this.state.currentDataNewScore) &&
           parseFloat(this.state.currentDataMax) === parseFloat(this.state.currentDataNewMax)) {
          this.closeCurrentDataDialog();
        } else {
          if(this.verifyCurrentData(this.state.currentDataNewName, this.state.currentDataNewScore, this.state.currentDataNewMax)) {
            this.props.modifyData(this.state.categoryName,
                                  this.state.currentDataName, this.state.currentDataScore,
                                  this.state.currentDataMax, this.state.currentDataNewName,
                                  this.state.currentDataNewScore, this.state.currentDataNewMax);
            this.closeCurrentDataDialog();
          }
        }

        break;
      default:
        break;
    }
  }
  /* End of opening current data dialog (to modify or delete). */

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
              <Button onClick={this.openNewDataDialog} style={{ height: 40 }}>
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
          onClose={this.closeNewDataDialog}
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
              onChange={(e) => this.changeNewData(e, 'assignmentName')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="assignmentScore"
              label="Your Score"
              type="number"
              inputProps={{ min: '0', step: '0.5' }}
              required={true}
              onChange={(e) => this.changeNewData(e, 'assignmentScore')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="assignmentMaxScore"
              label="Maximum Score"
              type="number"
              inputProps={{ min: '0', step: '0.5' }}
              required={true}
              onChange={(e) => this.changeNewData(e, 'assignmentMaxScore')}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeNewDataDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.checkNewData} color="primary">
              Add Assignment
            </Button>
          </DialogActions>
        </Dialog>

        {/* Diaglogue for modifying current assignment! */}
        <Dialog
          open={this.state.openCurrentData}
          onClose={this.closeCurrentDataDialog}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Modifying assignment: {this.state.currentDataName}</DialogTitle>
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
              value={this.state.currentDataNewName}
              required={true}
              onChange={(e) => this.changeCurrentData(e, 'assignmentName')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="assignmentScore"
              label="Your Score"
              type="number"
              inputProps={{ min: '0', step: '0.5' }}
              value={this.state.currentDataNewScore}
              required={true}
              onChange={(e) => this.changeCurrentData(e, 'assignmentScore')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="assignmentMaxScore"
              label="Maximum Score"
              type="number"
              inputProps={{ min: '0', step: '0.5' }}
              value={this.state.currentDataNewMax}
              required={true}
              onChange={(e) => this.changeCurrentData(e, 'assignmentMaxScore')}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeCurrentDataDialog} color="primary">
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