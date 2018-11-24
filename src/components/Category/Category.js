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

  getState = () => {
    const name = this.getCategoryName();
    const weight = this.getCategoryWeight();
    const id = this.getCategoryID();

    const initialState = {
      assignmentID: 0,

      openCurrentCategory: false,
      openConfirmDeleteCategory: false,
      categoryID: id,
      categoryName: name,
      categoryWeight: weight,
      newCategoryName: '',
      newCategoryWeight: 0.0,

      openNewData: false,
      newDataName: '',
      newDataScore: 0.0,
      newDataMax: 0.0,

      openCurrentData: false,
      currentDataID: -1,
      currentDataName: '',
      currentDataScore: 0.0,
      currentDataMax: 0.0,
      currentDataNewName: '',
      currentDataNewScore: 0.0,
      currentDataNewMax: 0.0,
    }
    return initialState;
  }

  getCategoryName = () => {
    const currentCategory = this.props.categories.get(this.props.categoryID);
    return currentCategory.name;
  }

  getCategoryWeight = () => {
    const currentCategory = this.props.categories.get(this.props.categoryID);
    return currentCategory.weight;
  }

  getCategoryID = () => {
    return this.props.categoryMapping.get(this.getCategoryName());
  }

  renderData = () => {
    var dataSet = [ ];
    var categoryData = this.props.data;

    if(categoryData !== undefined) {
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
  }

  handleKeyPress = (e, action) => {
    if(e.key === 'Enter') {
      switch(action) {
        case 'addNewData':
          this.checkNewData();
          break;
        case 'changeCurrentData':
          this.submitChanges('change');
          break;
        case 'changeCategory':
          this.modifyCategory();
          break;
        default:
          break;
      }
    }
  }

  /* Start of opening current category dialog (to modify or delete). */
  openConfirmDeleteCategory = () => {
    this.setState({
      openCurrentCategory: false,
      openConfirmDeleteCategory: true,
    });
  }

  closeConfirmDeleteCategory = () => {
    this.setState({
      openConfirmDeleteCategory: false,
    });
  }

  deleteCurrentCategory = () => {
    this.props.deleteCategory(this.getCategoryName());
    this.closeConfirmDeleteCategory();
  }

  openCurrentCategoryDialog = () => {
    this.setState({
      openCurrentCategory: true,
      newCategoryName: this.getCategoryName(),
      newCategoryWeight: this.getCategoryWeight(),
    });
  }

  closeCurrentCategoryDialog = () => {
    this.setState({
      openCurrentCategory: false,
    });
  }

  changeCategory = (e, field) => {
    switch(field) {
      case 'categoryName':
        this.setState( { newCategoryName: e.target.value } )
        break;
      case 'categoryWeight':
        this.setState( { newCategoryWeight: e.target.value } )
        break;
      default:
        break;
    }
  }

  checkNewCategory = () => {
    const categoryName = this.state.newCategoryName;
    const categoryWeight = this.state.newCategoryWeight;
    const totalWeight = this.props.totalWeight;

    if(categoryName === '') {
      alert('You cannot have an empty name for a category!');
      return false;
    } else if(categoryWeight <= 0) {
      alert('The category cannot 0 or negative weight!');
      return false;
    } else if((100 - (totalWeight - this.getCategoryWeight())) < categoryWeight) {
      const maximumWeight = (100 - (totalWeight - this.getCategoryWeight()));
      alert('You cannot exceed weight of 100. The maximum weight you can set for this category is ' + maximumWeight + '.');
      return false;
    }
    return true;
  }

  modifyCategory = () => {
    if(this.checkNewCategory()) {
      this.props.modifyCategory(this.props.categoryMapping.get(this.getCategoryName()),
                                this.getCategoryName(),
                                this.getCategoryWeight(),
                                this.state.newCategoryName,
                                this.state.newCategoryWeight);
      this.closeCurrentCategoryDialog();
    }
  }



  /* End of opening current category dialog (to modify or delete). */

  /* Start of opening new data dialog (to create more data). */
  openNewDataDialog = () => {
    this.setState({
      openNewData: true,
      newDataName: '',
      newDataScore: 0.0,
      newDataMax: 0.0,
    });
  }

  closeNewDataDialog = () => {
    this.setState({ 
      openNewData: false 
    });
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
      this.props.addData(this.getCategoryName(), this.state.assignmentID, assignmentName, assignmentScore, assignmentMaxScore);

      this.setState({
        assignmentID: this.state.assignmentID + 1
      });
    }
  }
  /* End of opening new data dialog (to create more data). */

  /* Start of opening current data dialog (to modify or delete). */
  openCurrentDataDialog = (assignmentID, assignmentName, assignmentScore, assignmentMax) => {
    this.setState({ 
      openCurrentData: true,
      currentDataID: assignmentID,
      currentDataName: assignmentName,
      currentDataScore: assignmentScore,
      currentDataMax: assignmentMax,
      currentDataNewName: assignmentName,
      currentDataNewScore: assignmentScore,
      currentDataNewMax: assignmentMax,
    });
  }

  closeCurrentDataDialog = () => {
    this.setState({ 
      openCurrentData: false 
    });
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

  verifyCurrentData = () => {
    const assignmentName = this.state.currentDataNewName;
    const assignmentScore = this.state.currentDataNewScore;
    const assignmentMaxScore = this.state.currentDataNewMax;

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
        /* Possible future implementation: confirmation to delete assignment? */
        this.props.deleteData(this.getCategoryName(), this.state.currentDataID);
        this.closeCurrentDataDialog();
        break;
      case 'change':
        if(this.verifyCurrentData()) {
          this.props.modifyData(this.getCategoryName(),
                                this.state.currentDataID,
                                this.state.currentDataName,
                                this.state.currentDataScore,
                                this.state.currentDataMax,
                                this.state.currentDataNewName,
                                this.state.currentDataNewScore, 
                                this.state.currentDataNewMax);
          this.closeCurrentDataDialog();
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
              <Button onClick={this.openCurrentCategoryDialog}
                      color='inherit' 
                      style={{ height: 40, cursor: 'pointer' }}>
                  {this.getCategoryName()} ({this.getCategoryWeight()}%)
              </Button>
              <Button style={{ height: 40 }}
                      onClick={this.openNewDataDialog}>
                <AddIcon style={{ height: 'auto', padding: 0, margin: 0, color: '#2979ff'}} />
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
              To add a new assignment to {this.getCategoryName()}, please enter
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
              onKeyPress={(e) => this.handleKeyPress(e, 'addNewData')}
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
              onKeyPress={(e) => this.handleKeyPress(e, 'addNewData')}
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
              onKeyPress={(e) => this.handleKeyPress(e, 'addNewData')}
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
              onKeyPress={(e) => this.handleKeyPress(e, 'changeCurrentData')}
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
              onKeyPress={(e) => this.handleKeyPress(e, 'changeCurrentData')}
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
              onKeyPress={(e) => this.handleKeyPress(e, 'changeCurrentData')}
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

        {/* Diaglogue for modifying current category! */}
        <Dialog
          open={this.state.openCurrentCategory}
          onClose={this.closeCurrentCategoryDialog}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Modifying category: {this.getCategoryName()}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To <strong>modify</strong> this category, please enter any changes 
              you would like to make.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="categoryName"
              label="Category Name"
              type="text"
              value={this.state.newCategoryName}
              required={true}
              onChange={(e) => this.changeCategory(e, 'categoryName')}
              onKeyPress={(e) => this.handleKeyPress(e, 'changeCategory')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="categoryWeight"
              label="Category Weight (1 to 100)"
              type="number"
              inputProps={{ min: '1', max: '100', step: '0.5' }}
              value={this.state.newCategoryWeight}
              required={true}
              onChange={(e) => this.changeCategory(e, 'categoryWeight')}
              onKeyPress={(e) => this.handleKeyPress(e, 'changeCategory')}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeCurrentCategoryDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.openConfirmDeleteCategory} color="primary">
              Delete Category
            </Button>
            <Button onClick={this.modifyCategory} color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.openConfirmDeleteCategory}
          onClose={this.closeConfirmDeleteCategory}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            Are you sure you want to delete the category: {this.getCategoryName()}?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Deleting a category will <strong>delete all</strong> assignments inside the category as well!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeConfirmDeleteCategory} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteCurrentCategory} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        

      </div>
    );
  }
}

export default Category;