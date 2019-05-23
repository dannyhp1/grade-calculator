import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { css } from 'emotion/macro';

import Header from '../Header/Header';
import Grade from '../Grade/Grade';
import CategoryList from '../Category/CategoryList';

import NewCategory from '../Forms/NewCategory';
import NewAssignment from '../Forms/NewAssignment';

const app = css`
  background: '#cfdff1';
  text-align: center;
`;

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      newCategory: false,
      newHomework: false,
      /* Categories start at ID = 0. */
      categoryID: 0,
      categories: [ ],
      modifyCategory: null,
      modifyAssignment: null,
    };
  };

  openNewCategory = () => {
    this.setState({
      ...this.state,
      newCategory: true,
    })
  }

  closeNewCategory = () => {
    this.setState({
      ...this.state,
      newCategory: false,
    })
  }

  addNewCategory = (name, weight) => {
    let categories = this.state.categories;

    /* Each category has its assigned ID (fetched from state) and aid (assignment id) is default to 0 for first assignment. */
    const newCategory = {id: this.state.categoryID, name: name, weight: weight, aid: 0, assignments: [ ]};
    categories.push(newCategory);

    this.setState({
      ...this.state,
      newCategory: false,
      categories: categories,
      categoryID: this.state.categoryID + 1,
    }, console.log(this.state));
  }

  openNewAssignment = (categoryID, assignmentID) => {
    this.setState({
      ...this.state,
      newAssignment: true,
      modifyCategory: categoryID,
      modifyAssignment: assignmentID,
    })
  }

  closeNewAssignment = () => {
    this.setState({
      ...this.state,
      newAssignment: false,
      modifyCategory: null,
      modifyAssignment: null,
    })
  }

  addNewAssignment = (name, score, max) => {
    /* Linear search to find categoryID, can change into map later. */
    let categories = this.state.categories;
    let index = null;

    for(let i = 0; i < categories.length; ++i) {
      if(categories[i]['id'] === this.state.modifyCategory) {
        index = i;
        break;
      }
    }

    categories[index]['assignments'].push({id: this.state.modifyAssignment, name: name, score: score, max: max});

    this.setState({
      ...this.state,
      newAssignment: false,
      categories: categories,
    }, console.log(this.state));
  }

  render() {
    return (
      <div className={app} style={{ fontFamily: 'Roboto' }}>
        <CssBaseline />
        <Header openNewCategory={this.openNewCategory} />
        <Grade categories={this.state.categories}/>
        <CategoryList categories={this.state.categories} openNewAssignment={this.openNewAssignment}/>

        <NewCategory show={this.state.newCategory} close={this.closeNewCategory} submit={this.addNewCategory} />
        <NewAssignment show={this.state.newAssignment} close={this.closeNewAssignment} submit={this.addNewAssignment} />
      </div>
    );
  }
}

export default App;