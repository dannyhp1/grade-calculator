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
    const mapping = new Map();

    const initialState = {
      categoryID: 0,
      categories: categories,
      categoryMapping: mapping,
      data: data,
      totalWeight: 0.0,
    }

    return initialState;
  };

  addCategory = (categoryName, categoryWeight) => {
    const newWeight = this.state.totalWeight + categoryWeight;
    const newCategories = new Map(this.state.categories);
    const newData = new Map(this.state.data);
    const newMapping = new Map(this.state.categoryMapping);

    newCategories.set(this.state.categoryID, { name: categoryName, weight: categoryWeight, id: this.state.categoryID });
    newData.set(categoryName, new Map());
    newMapping.set(categoryName, this.state.categoryID);

    this.setState({
      totalWeight: newWeight,
      categories: newCategories,
      categoryMapping: newMapping,
      data: newData,
      categoryID: this.state.categoryID + 1
    });

  };

  modifyCategory = (currentID, currentName, currentWeight, newName, newWeight) => {
    var mapping = new Map(this.state.categoryMapping);
    var currentValue = mapping.get(currentName);
    mapping.delete(currentName);
    mapping.set(newName, currentValue);

    var categories = new Map(this.state.categories);
    categories.set(currentID, { name: newName, weight: parseFloat(newWeight) } );

    var data = new Map(this.state.data);
    var currentData = data.get(currentName);
    data.delete(currentName);
    data.set(newName, currentData);

    var newTotal = this.state.totalWeight;
    newTotal -= parseFloat(currentWeight);
    newTotal += parseFloat(newWeight);

    this.setState({
      categories: categories,
      categoryMapping: mapping,
      data: data,
      totalWeight: newTotal,
    });
  }

  deleteCategory = (categoryName) => {
    const currentID = this.state.categoryMapping.get(categoryName);
    var categories = new Map(this.state.categories);
    var data = new Map(this.state.data);

    var newTotal = this.state.totalWeight;
    var currentCategory = categories.get(currentID);
    newTotal -= parseFloat(currentCategory.weight);

    categories.delete(currentID);
    data.delete(categoryName);

    this.setState({
      categories: categories,
      data: data,
      totalWeight: newTotal,
    })

    console.log('# --- End --- #');
  }

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
    var categoryData = this.state.data;
    var currentCategory = categoryData.get(categoryName);
    var dataInformation = currentCategory.get(currentID);
    dataInformation.assignmentName = newName;
    dataInformation.assignmentScore = newScore;
    dataInformation.assignmentMaxScore = newMax;

    currentCategory.set(currentID, dataInformation);
    categoryData.set(categoryName, currentCategory);

    this.setState({
      data: categoryData
    });
  }

  deleteData = (categoryName, currentID) => {
    var categoryData = this.state.data;
    var currentCategory = categoryData.get(categoryName);
    currentCategory.delete(currentID);

    categoryData.set(categoryName, currentCategory);

    this.setState({
      data: categoryData
    });
  }

  renderCategories = () => {
    const categories = [ ]

    for(var [categoryID, categoryData] of this.state.categories) {
      categories.push({id: categoryID, name: categoryData.name, weight: categoryData.weight});
    }

    return categories.map((category, index) => (
      <Grid item lg={4} key={index} style={{direction: 'column'}}>
        <Category
            totalWeight={this.state.totalWeight}
            categories={this.state.categories}
            categoryMapping={this.state.categoryMapping}
            categoryID={category.id}
            modifyCategory={this.modifyCategory}
            deleteCategory={this.deleteCategory}
            data={this.state.data.get(category.name)}
            addData={this.addData}
            modifyData={this.modifyData}
            deleteData={this.deleteData}/>
      </Grid>
    ));
  }

  render() {
    return (
      <div className={app}>
        <div style={{ background: '#cfdff1',
                      height: '200vh' }}>
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
      </div>
    );
  }
}

export default App;
