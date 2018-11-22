import React, { Component } from 'react';
import { css } from 'emotion/macro';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grade from '../Grade/Grade';
import AppHeader from '../AppHeader/AppHeader';
import Category from '../Category/Category';

import {
  Grid,
} from '@material-ui/core';

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
      <Category key={index}
          categoryName={category.name}
          categoryWeight={category.weight}
          dataSet={this.state.allData}
          addData={this.addData}/>
    ));
  }

  render() {
    return (
      <div className={app}>
        <CssBaseline />
        <AppHeader currentCategories={this.state.allCategories} 
                   addCategory={this.handleAddCategory}
                   currentWeight={this.state.totalWeight}/>
          
        <Grade categories={this.state.allCategories} data={this.state.allData}/>

        <Grid style={{display: 'flex', flexWrap: 'wrap' }}>
          {this.renderCategories()}
        </Grid>

      </div>
    );
  }
}

export default App;
