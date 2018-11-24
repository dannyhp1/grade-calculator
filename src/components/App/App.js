import React, { Component } from 'react';
import { css } from 'emotion/macro';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grade from '../Grade/Grade';
import AppHeader from '../AppHeader/AppHeader';
import Category from '../Category/Category';
import { Grid } from '@material-ui/core';

const app = css`
  text-align: center;
`;

class App extends Component {
  constructor (props) {
    super(props);
    this.state = this.getInitialState();
  };

  getInitialState() {
    const categories = new Map();
    const data = new Map();

    const initialState = {
      categories: categories,
      data: data,
      totalWeight: 0.0,
    }

    return initialState;
  };

  addCategory = (categoryName, categoryWeight) => {
    const newWeight = this.state.totalWeight + categoryWeight;
    const newCategories = new Map(this.state.categories);
    const newData = new Map(this.state.data);

    newCategories.set(categoryName, categoryWeight);
    newData.set(categoryName, new Map());

    this.setState({
      totalWeight: newWeight,
      categories: newCategories,
      data: newData,
    });

  };

  addData = (categoryName, assignmentID, assignmentName, assignmentScore, assignmentMaxScore) => {
    var categoryData = this.state.data;
    var currentData = categoryData.get(categoryName);
    var newAssignmentInformation = { assignmentName: assignmentName, 
                                     assignmentScore: assignmentScore, 
                                     assignmentMaxScore: assignmentMaxScore }
    currentData.set(assignmentID, newAssignmentInformation);
    categoryData.set(categoryName, currentData);

    this.setState({
      data: categoryData
    });
  }

  modifyData = (categoryName, currentID, currentName, currentScore, currentMax, newName, newScore, newMax) => {
    console.log(categoryName, currentName, currentScore, currentMax, newName, newScore, newMax);
  }

  renderCategories = () => {
    const categories = [ ]

    for(var [category, weight] of this.state.categories) {
      categories.push({name: category, weight: weight});
    }

    return categories.map((category, index) => (
      <Grid item lg={4} key={index} style={{direction: 'column'}}>
        <Category
            categoryName={category.name}
            categoryWeight={category.weight}
            data={this.state.data.get(category.name)}
            addData={this.addData}
            modifyData={this.modifyData}/>
      </Grid>
    ));
  }

  render() {
    console.log(this.state);
    return (
      <div className={app}>
        <CssBaseline />
        <AppHeader addCategory={this.addCategory}
                   categories={this.state.categories} 
                   currentWeight={this.state.totalWeight}/>
          
        <Grade categories={this.state.categories} data={this.state.data}/>
        
        <div>
          <Grid container spacing={24} 
                style={{ justify: 'center',
                         display: 'flex', 
                         flexWrap: 'wrap',
                         flexDirection: 'row' }}>
            {this.renderCategories()}
          </Grid>
        </div>

      </div>
    );
  }
}

export default App;
