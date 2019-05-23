import React, {Component} from 'react';
import Category from '../Category/Category';
import { 
  Grid,
} from '@material-ui/core';

class CategoryList extends Component {

  renderCategories = () => {
    const categories = this.props.categories;

    return categories.map((category, index) => (
      <Category category={category} openNewAssignment={this.props.openNewAssignment} key={index}/>
    ));

  }

  render() {
    return (
      <div>
        <Grid container spacing={8}>
          {this.renderCategories()}
        </Grid>
      </div>
    );
  }
}

export default CategoryList;