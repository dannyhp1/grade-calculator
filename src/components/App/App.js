import React, { Component } from 'react';
import ReactGA from 'react-ga';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from '../Header/Header';
import Grade from '../Grade/Grade';
import CategoryList from '../Category/CategoryList';
import Ad from '../Ads/Ad';

import Announcement from '../Forms/Announcement';
import NewCategory from '../Forms/NewCategory';
import NewAssignment from '../Forms/NewAssignment';
import ModifyCategory from '../Forms/ModifyCategory';
import ModifyAssignment from '../Forms/ModifyAssignment';
import SaveData from '../Forms/SaveData';
import LoadData from '../Forms/LoadData';

const fetchUrl = 'https://gradecalculator-server.dannyhp.com/gradecalculator/load/';
const postUrl = 'https://gradecalculator-server.dannyhp.com/gradecalculator/save';
// const postUrl = 'http://localhost:5000/gradecalculator/save';
// const fetchUrl = 'http://localhost:5000/gradecalculator/load/';

function initializeReactGA() {
  ReactGA.initialize('UA-129689668-1');
  ReactGA.pageview('/');
}

class App extends Component {
  constructor (props) {
    super(props);

    initializeReactGA();

    this.state = {
      announcement: true,
      saveData: false,
      loadData: false,
      newCategory: false,
      newHomework: false,
      changeCategory: false,
      changeAssignment: false,
      /* Categories start at ID = 0. */
      categoryID: 0,
      categories: [ ],
      modifyCategory: null,
      modifyAssignment: null,
    };
  };

  openAnnouncement = () => {
    this.setState({
      ...this.state,
      announcement: true,
    });
  }

  closeAnnouncement = () => {
    this.setState({
      ...this.state,
      announcement: false,
    });
  }

  saveData = (username) => {
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
    const url = fetchUrl + username;

    axios.get(url)
      .then(response => {
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
    const newCategory = {id: this.state.categoryID, name: name.toLowerCase(), weight: weight, aid: 0, assignments: [ ]};
    categories.push(newCategory);

    this.setState({
      ...this.state,
      newCategory: false,
      categories: categories,
      categoryID: this.state.categoryID + 1,
    });
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

    categories[index]['aid'] = categories[index]['aid'] + 1;
    categories[index]['assignments'].push({id: this.state.modifyAssignment, name: name, score: score, max: max});

    this.setState({
      ...this.state,
      newAssignment: false,
      categories: categories,
    });
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

  renderChangeCategory = () => {
    if(this.state.changeCategory) { 
      return (
        <ModifyCategory show={this.state.changeCategory} close={this.closeChangeCategory} delete={this.deleteCategory} submit={this.changeCategory} current={this.state.modifyCategory} /> 
      );
    }
  }

  openChangeCategory = (id) => {
    let categories = this.state.categories;
    let index = null;

    for(let i = 0; i < categories.length; ++i) {
      if(categories[i]['id'] === id) {
        index = i;
        break;
      }
    }

    this.setState({
      ...this.state,
      changeCategory: true,
      modifyCategory: {index: index, id: id, name: this.state.categories[index]['name'], weight: this.state.categories[index]['weight']},
    });
  }

  closeChangeCategory = () => {
    this.setState({
      ...this.state,
      changeCategory: false,
      modifyCategory: null,
    });
  }

  changeCategory = (name, weight) => {
    let categories = this.state.categories;
    const details = this.state.modifyCategory;
    const current = categories[details['index']];

    categories[details['index']] = {id: current['id'], name: name, weight: weight, aid: current['aid'], assignments: current['assignments']}

    this.setState({
      ...this.state,
      categories: categories,
      changeCategory: false,
      modifyCategory: null,
    });
  }

  deleteCategory = () => {
    let categories = this.state.categories;
    const details = this.state.modifyCategory;
    
    categories.splice(details['index'], 1);

    this.setState({
      ...this.state,
      categories: categories,
      changeCategory: false,
      modifyCategory: false,
    });
  }

  renderChangeAssignment = () => {
    if(this.state.changeAssignment) { 
      return (
        <ModifyAssignment show={this.state.changeAssignment} close={this.closeChangeAssignment} delete={this.deleteAssignment} submit={this.changeAssignment} current={this.state.modifyAssignment} /> 
      );
    }
  }

  openChangeAssignment = (category, assignment) => {
    const categories = this.state.categories;
    let categoryIndex = null;

    for(let i = 0; i < categories.length; ++i) {
      if(categories[i]['id'] === category) {
        categoryIndex = i;
        break;
      }
    }

    const assignments = categories[categoryIndex]['assignments'];
    let assignmentIndex = null;
    
    for(let j = 0; j < assignments.length; ++j) {
      if(assignments[j]['id'] === assignment) {
        assignmentIndex = j;
        break;
      }
    }

    const currentAssignment = categories[categoryIndex]['assignments'][assignmentIndex];

    this.setState({
      ...this.state,
      changeAssignment: true,
      modifyCategory: {index: categoryIndex},
      modifyAssignment: {index: assignmentIndex, id: currentAssignment['id'], name: currentAssignment['name'], score: currentAssignment['score'], max: currentAssignment['max']}
    })
  }

  closeChangeAssignment = () => {
    this.setState({
      ...this.state,
      changeAssignment: false,
      modifyCategory: null,
      modifyAssignment: null,
    });
  }

  changeAssignment = (name, score, max) => {
    let categories = this.state.categories;
    const categoryIndex = this.state.modifyCategory['index'];
    const assignmentIndex = this.state.modifyAssignment['index'];
    const currentAssignment = categories[categoryIndex]['assignments'][assignmentIndex];

    categories[categoryIndex]['assignments'][assignmentIndex] = {id: currentAssignment['id'], name: name, score: score, max: max}

    this.setState({
      ...this.state,
      categories: categories,
      changeAssignment: false,
      modifyCategory: null,
      modifyAssignment: null,
    });
  }

  deleteAssignment = () => {
    let categories = this.state.categories;
    const categoryIndex = this.state.modifyCategory['index'];
    const assignmentIndex = this.state.modifyAssignment['index'];

    categories[categoryIndex]['assignments'].splice(assignmentIndex, 1);
    
    this.setState({
      ...this.state,
      changeAssignment: false,
      modifyCategory: null,
      modifyAssignment: null,
    })
  }

  render() {
    return (
      <div style={{ fontFamily: 'Roboto', textAlign: 'center' }}>
        <CssBaseline />
        <Header openNewCategory={this.openNewCategory} clear={this.clearGrade} save={this.openSaveData} load={this.openLoadData} />
        <Ad />
        <Grade categories={this.state.categories} />
        <CategoryList categories={this.state.categories} openNewAssignment={this.openNewAssignment} 
                      openModifyCategory={this.openChangeCategory} openModifyAssignment={this.openChangeAssignment}
        />

        <Announcement show={this.state.announcement} close={this.closeAnnouncement} />
        <NewCategory show={this.state.newCategory} close={this.closeNewCategory} submit={this.addNewCategory} />
        <NewAssignment show={this.state.newAssignment} close={this.closeNewAssignment} submit={this.addNewAssignment} />
        {this.renderChangeCategory()}
        {this.renderChangeAssignment()}
        <SaveData show={this.state.saveData} close={this.closeSaveData} submit={this.saveData} />
        <LoadData show={this.state.loadData} close={this.closeLoadData} submit={this.loadData} />
      </div>
    );
  }
}

export default App;