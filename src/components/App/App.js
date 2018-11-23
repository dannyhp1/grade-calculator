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
    newCategories.set(categoryName, [ ]);

    this.setState({
      totalWeight: newWeight,
      categories: newCategories,
      data: newData,
    });

  };

  addData = (categoryName, assignmentName, assignmentScore, assignmentMaxScore) => {
    var currentData = this.state.allData[categoryName].slice();
    var newAssignment = { assignmentName, assignmentScore, assignmentMaxScore }
    currentData.push(newAssignment);

    this.setState({
      allData: {
        ...this.state.allData,
        [categoryName] : currentData,
      },
    });
  }

  modifyData = (categoryName, currentName, currentScore, currentMax, newName, newScore, newMax) => {
    console.log(categoryName, currentName, currentScore, currentMax, newName, newScore, newMax);
  }

  renderCategories = () => {
    const categories = this.state.allCategories.slice();

    return categories.map((category, index) => (
      <Grid item lg={4} key={index} style={{direction: 'column'}}>
        <Category
            categoryName={category.name}
            categoryWeight={category.weight}
            dataSet={this.state.allData}
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
          
        {/* <div>
          <Grade categories={this.state.allCategories} data={this.state.allData}/>

          <Grid container spacing={24} style={{
                          justify: 'center',
                          display: 'flex', 
                          flexWrap: 'wrap',
                          flexDirection: 'row'}}>
            {this.renderCategories()}
          </Grid>
        </div> */}

      </div>
    );
  }
}

export default App;
