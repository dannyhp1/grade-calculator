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

class AppHeader extends Component {
  constructor (props) {
    super(props);
    this.state = {
      categoryName: '',
      categoryWeight: 0.0,
      openNewCategory: false,
    };
  };

  handleOpenCategory = () => {
    this.setState({
      openNewCategory: true ,
      categoryName: '',
      categoryWeight: 0.0,
    })
  }

  handleCloseCategory = () => {
    this.setState( { openNewCategory: false } )
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
    const categoryName = this.state.categoryName.trim();
    const categoryWeight = parseFloat(this.state.categoryWeight);

    // Check to see if the categoryName field is empty or not.
    if(categoryName === '') {
      // Change this to an error notification bar in the future. [TODO]
      alert('You cannot add a category with an empty name!');
    } else if(categoryWeight <= 0 || categoryWeight > 100) {
      alert('Your category weight can only be between 1 and 100!');
    } else {
      // Check to see if there's another category with the same name. If there is,
      // they cannot proceed. [TODO - convert array to HashMap for easier access].
      
      /* CHANGE IMPLEMENTATION OF THIS FOR IT TO BE FASTER! CHANGE THE DATA STRUCTURE
      IN APP.JS WHERE this.props.currentCategories IS A HASHMAP INSTEAD. */
      var amountCategories = this.props.currentCategories.length;
      for(var i = 0; i < amountCategories; ++i) {
        if(this.props.currentCategories[i].name === categoryName) {
          alert('You already have a category named "' + categoryName + '". You must change the current category name before proceeding.');
          return;
        }
      }

      // Check to see if the weight will be over 100 when this category is added.
      // If it is, this shouldn't be valid!
      var combinedWeight = categoryWeight + this.props.currentWeight;
      if(combinedWeight > 100.00) {
        var maximumWeight = 100.00 - this.props.currentWeight;
        alert(categoryName + ' cannot have a weight of ' + categoryWeight + '. The maximum weight you can give this category is: ' + maximumWeight);
        return;
      }

      // If the inputs are valid, close the dialogue and add the category.
      this.handleCloseCategory();
      this.props.addCategory(categoryName, categoryWeight);
    }
  }

  render() {
    return (
      <div style={{ fontFamily: 'Roboto' }}>
        <AppBar color='primary' 
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
      </div>
    )
  }
}

export default AppHeader;