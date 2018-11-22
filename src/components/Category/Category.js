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
  width: '450px',
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
    }
    return state;
  }

  renderData = () => {
    const dataSet = this.props.dataSet[this.props.categoryName];

    return dataSet.map((data, index) => (
      <TableRow key={index}>
        <TableCell>{data.assignmentName}</TableCell>
        <TableCell numeric>{data.assignmentScore}</TableCell>
        <TableCell numeric>{data.assignmentMaxScore}</TableCell>
      </TableRow>
    ));
  }

  handleOpenData = () => {
    this.setState( { openNewData: true } )
  }

  handleCloseData = () => {
    this.setState( { openNewData: false } )
  }

  handleChange = (e, field) => {
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
    } else {
      this.handleCloseData();
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
              <Button onClick={this.handleOpenData} style={{ height: 40 }}>
                <AddIcon style={{ color: '#2979ff' }}/>
              </Button>
            </Grid>
            <Table style={{ width: 400, display: 'block' }}>
              <TableHead>
                <TableRow>
                  <TableCell>Assignment</TableCell>
                  <TableCell numeric>Score</TableCell>
                  <TableCell numeric>Maximum Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.renderData()}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog
          open={this.state.openNewData}
          onClose={this.handleClose}
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
              onChange={(e) => this.handleChange(e, 'assignmentName')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="assignmentScore"
              label="Your Score"
              type="number"
              inputProps={{ min: '0', step: '0.5' }}
              required={true}
              onChange={(e) => this.handleChange(e, 'assignmentScore')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="assignmentMaxScore"
              label="Maximum Score"
              type="number"
              inputProps={{ min: '0', step: '0.5' }}
              required={true}
              onChange={(e) => this.handleChange(e, 'assignmentMaxScore')}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseData} color="primary">
              Cancel
            </Button>
            <Button onClick={this.checkDataFields} color="primary">
              Add Assignment
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  }
}

export default Category;