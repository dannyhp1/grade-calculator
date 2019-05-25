import React, {Component} from 'react';
import Category from '../Category/Category';
import { 
  Grid,
} from '@material-ui/core';

class CategoryList extends Component {

  renderCategories = () => {
    const categories = this.props.categories;

    return categories.map((category, index) => (
      <Category key={index} category={category} openNewAssignment={this.props.openNewAssignment}
                openModifyCategory={this.props.openModifyCategory} openModifyAssignment={this.props.openModifyAssignment}
      />
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