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
  state = {
    allCategories: [ ],
    allData: { },
    totalWeight: 0.0,
  }

  handleAddCategory = (categoryName, categoryWeight) => {
    const newWeight = this.state.totalWeight + categoryWeight;
    const newCategories = [...this.state.allCategories, 
                           {'name': categoryName,
                            'weight': categoryWeight}
                          ];

    this.setState({
      totalWeight: newWeight,
      allCategories: newCategories,
      allData: {
        ...this.state.allData,
        [categoryName] : [ ],
      },
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

    console.log('Added the data!');
  }

  renderCategories = () => {
    const categories = this.state.allCategories.slice();

    return categories.map((category, index) => (
      <Grid item lg={4} key={index} style={{direction: 'column'}}>
        <Category
            categoryName={category.name}
            categoryWeight={category.weight}
            dataSet={this.state.allData}
            addData={this.addData}/>
      </Grid>
    ));
  }

  render() {
    return (
      <div className={app}>
        <CssBaseline />
        <AppHeader currentCategories={this.state.allCategories} 
                   addCategory={this.handleAddCategory}
                   currentWeight={this.state.totalWeight}/>
          
        <div>
          <Grade categories={this.state.allCategories} data={this.state.allData}/>

          <Grid container spacing={24} style={{
                          justify: 'center',
                          display: 'flex', 
                          flexWrap: 'wrap',
                          flexDirection: 'row'}}>
            {this.renderCategories()}
          </Grid>
        </div>

      </div>
    );
  }
}

export default App;
