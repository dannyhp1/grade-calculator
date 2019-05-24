import React, { Component } from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from '../Header/Header';
import Grade from '../Grade/Grade';
import CategoryList from '../Category/CategoryList';

import NewCategory from '../Forms/NewCategory';
import NewAssignment from '../Forms/NewAssignment';
import SaveData from '../Forms/SaveData';
import LoadData from '../Forms/LoadData';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      saveData: false,
      loadData: false,
      newCategory: false,
      newHomework: false,
      /* Categories start at ID = 0. */
      categoryID: 0,
      categories: [ ],
      modifyCategory: null,
      modifyAssignment: null,
    };
  };

  clearGrade = () => {
    this.setState({
      ...this.state,
      categoryID: 0,
      categories: [ ],
    });
  }

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

  openSaveData = () => {
    this.setState({
      ...this.state,
      saveData: true,
    });
  }

  closeSaveData = () => {
    this.setState({
      ...this.state,
      saveData: false,
    });
  }

  saveData = (username) => {
    const postUrl = 'https://gradecalculator-server.dannyhp.com/gradecalculator/save';
    // const postUrl = 'http://localhost:5000/gradecalculator/save';

    axios.post(postUrl, {
      username: username,
      categories: this.state.categories,
    }).then(response => {
      this.setState({
        ...this.state,
        saveData: false,
      });

    });
  }

  openLoadData = () => {
    this.setState({
      ...this.state,
      loadData: true,
    });
  }

  closeLoadData = () => {
    this.setState({
      ...this.state,
      loadData: false,
    });
  }

  loadData = (username) => {
    const fetchUrl = 'https://gradecalculator-server.dannyhp.com/gradecalculator/load/' + username;
    // const fetchUrl = 'http://localhost:5000/gradecalculator/load/' + username;

    axios.get(fetchUrl)
      .then(response => {
        console.log(response)
        const data = response['data'];

        if(data['status'] !== 200) {
          this.setState({
            ...this.state,
            categoryID: 0,
            categories: [ ],
            loadData: false,
          });

          return;
        }

        let categories = [ ];

        for(let i = 0; i < data['categories'].length; ++i) {
          const id = data['categories'][i][0]
          const name = data['categories'][i][1]
          const weight = data['categories'][i][2]
          const max_assignments = data['categories'][i][3]

          let assignments = [ ]
          const assignmentData = data['categories'][i][4];

          for(let j = 0; j < assignmentData.length; ++j) {
            const assignmentID = assignmentData[j][0];
            const assignmentName = assignmentData[j][1];
            const assignmentScore = assignmentData[j][2];
            const assignmentMax = assignmentData[j][3];

            assignments.push({ id: assignmentID, name: assignmentName, score: assignmentScore, max: assignmentMax });
          }

          categories.push({ id: id, name: name, weight: weight, aid: max_assignments, assignments: assignments });
        }

        this.setState({
          ...this.state,
          loadData: false,
          categories: categories,
          categoryID: data['max_category'],
        });
      });
  }

  render() {
    return (
      <div style={{ fontFamily: 'Roboto', textAlign: 'center' }}>
        <CssBaseline />
        <Header openNewCategory={this.openNewCategory} clear={this.clearGrade} save={this.openSaveData} load={this.openLoadData} />
        <Grade categories={this.state.categories} />
        <CategoryList categories={this.state.categories} openNewAssignment={this.openNewAssignment} />

        <NewCategory show={this.state.newCategory} close={this.closeNewCategory} submit={this.addNewCategory} />
        <NewAssignment show={this.state.newAssignment} close={this.closeNewAssignment} submit={this.addNewAssignment} />
        <SaveData show={this.state.saveData} close={this.closeSaveData} submit={this.saveData} />
        <LoadData show={this.state.loadData} close={this.closeLoadData} submit={this.loadData} />
      </div>
    );
  }
}

export default App;