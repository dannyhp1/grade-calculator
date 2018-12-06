import React, { Component } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Toolbar,
  AppBar,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import InfoIcon from '@material-ui/icons/Info';

class AppHeader extends Component {
  constructor (props) {
    super(props);
    this.state = {
      categoryName: '',
      categoryWeight: '',
      openNewCategory: false,
      saveName: '',
      openSave: false,
      loadName: '',
      openLoad: false,

      openReset: false,
    };
  };

  handleOpenReset = () => {
    this.setState({
      openReset: true,
    });
  }

  handleCloseReset = () => {
    this.setState({
      openReset: false 
    });
  }

  resetEverything = () => {
    this.props.reset();
    this.handleCloseReset();
  }

  handleOpenSave = () => {
    this.setState({
      openSave: true,
      saveName: '',
    });
  }

  handleCloseSave = () => {
    this.setState({
      openSave: false 
    });
  }

  handleSaveName = (e) => {
    this.setState( { saveName: e.target.value } )
  }

  checkSaveName = () => {
    if(this.state.saveName === '') {
      this.props.addNotification('noUsernameSave')
      return;
    } else {
      this.props.saveData(this.state.saveName);
      this.handleCloseSave();
    }
  }

  handleKeyPressSave = (e) => {
    if(e.key === 'Enter') {
      this.checkSaveName();
    }
  }

  handleOpenLoad = () => {
    this.setState({
      openLoad: true,
      loadName: '',
    });
  }

  handleCloseLoad = () => {
    this.setState({
      openLoad: false 
    });
  }

  handleLoadName = (e) => {
    this.setState( { loadName: e.target.value } )
  }

  checkLoadName = () => {
    if(this.state.loadName === '') {
      this.props.addNotification('noUsernameLoad')
      return;
    } else {
      this.props.loadData(this.state.loadName);
      this.handleCloseLoad();
    }
  }

  handleKeyPressLoad = (e) => {
    if(e.key === 'Enter') {
      this.checkLoadName();
    }
  }

  handleOpenCategory = () => {
    this.setState({
      openNewCategory: true ,
      categoryName: '',
      categoryWeight: '',
    });
  }

  handleCloseCategory = () => {
    this.setState({
      openNewCategory: false 
    });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.checkCategoryFields();
    }
  }

  handleChange = (e, field) => {
    switch(field) {
      case 'categoryName':
        this.setState( { categoryName: e.target.value } )
        break;
      case 'categoryWeight':
        this.setState( { categoryWeight: e.target.value } )
        break;
      default:
        break;
    }
  }

  checkCategoryFields = () => {
    const categoryName = this.state.categoryName.trim().toLowerCase();
    const categoryWeight = parseFloat(this.state.categoryWeight);

    if(categoryName === '') {
      this.props.addNotification('invalidCategoryName', {type: 'empty'});
      return;
    } if(isNaN(categoryWeight)) {
      this.props.addNotification('invalidCategoryWeight', {type: 'empty'});
      return;
    } else if(categoryWeight <= 0 || categoryWeight > 100) {
      this.props.addNotification('invalidCategoryWeight', {type: 'exceed'});
      return;
    } else if(this.props.data.get(categoryName) !== undefined) {
      this.props.addNotification('invalidCategoryName', {type: 'duplicate'});
      return;
    } else {
      /* Check to see if the weight will be over 100 when category is added (not valid).
      Future implementation: extra credit available! */
      const combineWeight = categoryWeight + this.props.currentWeight;
      if(combineWeight > 100.00) {
        var maximumWeight = 100.00 - this.props.currentWeight;
        this.props.addNotification('invalidCategoryWeight', {type: 'outOfBounds', weight: categoryWeight, combined: combineWeight, max: maximumWeight});
        return;
      } else {
        this.handleCloseCategory();
        this.props.addCategory(categoryName, categoryWeight);
      }
    }
  }

  render() {
    return (
      <div style={{ fontFamily: 'Roboto' }}>
        <AppBar style={{ background: '#6486ba' }}
                justify='space-between'
                position="sticky">
          <Toolbar>
            <Grid container 
                  justify='space-between' 
                  spacing={24}>
              <Grid item>
                <Button color='inherit' 
                        style={{ height: 40, cursor: 'default', backgroundColor: 'transparent'}} 
                        disableTouchRipple={true}>
                  <Typography variant='title' 
                              color='inherit'>
                    Grade Calculator (Beta)
                  </Typography>
                </Button>
              </Grid>

              <Grid item>
                <Button onClick={this.handleOpenLoad}
                        color='inherit' 
                        style={{ height: 40 }}>
                  <CloudDownloadIcon /> <span style={{ marginLeft: 5, paddingRight: 0, marginRight: 0, textAlign: 'center' }}>Load</span>
                </Button>
                <Button onClick={this.handleOpenSave}
                        color='inherit' 
                        style={{ height: 40 }}>
                  <CloudUploadIcon /> <span style={{ marginLeft: 5, paddingRight: 0, marginRight: 0, textAlign: 'center' }}>Save</span>
                </Button>
                <Button onClick={this.handleOpenReset}
                        color='inherit' 
                        style={{ height: 40 }}>
                  <CloseIcon /> <span style={{ marginLeft: 5 }}>Reset Grades</span>
                </Button>
                <Button onClick={this.handleOpenCategory}
                        color='inherit' 
                        style={{ height: 40 }}>
                  <AddIcon /> <span style={{ marginLeft: 5 }}>Add Category</span>
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Dialog
          open={this.state.openNewCategory}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add New Category</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new category to the grade calculator, please enter the
              category name and its weight percentage (out of 100). <br/> <br/>
              For example, if quizzes are worth 25% of your grade, the weight
              will be 25.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="categoryName"
              label="Category Name"
              type="text"
              required={true}
              onChange={(e) => this.handleChange(e, 'categoryName')}
              onKeyPress={(e) => this.handleKeyPress(e)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="categoryWeight"
              label="Category Weight (1 to 100)"
              type="number"
              inputProps={{ min: '1', max: '100', step: '0.5' }}
              required={true}
              onChange={(e) => this.handleChange(e, 'categoryWeight')}
              onKeyPress={(e) => this.handleKeyPress(e)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseCategory} color="primary">
              Cancel
            </Button>
            <Button onClick={this.checkCategoryFields} color="primary">
              Add Category
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.openSave}
          onClose={this.handleCloseSave}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Save your grades!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can save all of your grade calculations and load them up
              again later. Make sure to make your username unique (as someone who
              enters the same username can override your data).
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="saveName"
              label="Username"
              type="text"
              required={true}
              onChange={(e) => this.handleSaveName(e)}
              onKeyPress={(e) => this.handleKeyPressSave(e)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseSave} color="primary">
              Cancel
            </Button>
            <Button onClick={this.checkSaveName} color="primary">
              Save Data
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.openLoad}
          onClose={this.handleCloseLoad}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Load in your grades!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the username you want to load the data from! Remember,
              everything is caps sensitive!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="loadName"
              label="Username"
              type="text"
              required={true}
              onChange={(e) => this.handleLoadName(e)}
              onKeyPress={(e) => this.handleKeyPressLoad(e)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseLoad} color="primary">
              Cancel
            </Button>
            <Button onClick={this.checkLoadName} color="primary">
              Load Data
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.openReset}
          onClose={this.handleCloseReset}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            Are you sure you want to reset everything?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              There is no other way to retrieve your data after clearing everything!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseReset} color="primary">
              Cancel
            </Button>
            <Button onClick={this.resetEverything} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    )
  }
}

export default AppHeader;