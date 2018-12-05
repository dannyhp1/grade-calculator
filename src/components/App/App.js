import React, { Component } from 'react';
import { css } from 'emotion/macro';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grade from '../Grade/Grade';
import AppHeader from '../AppHeader/AppHeader';
import Category from '../Category/Category';
import Reminder from '../Reminder/Reminder';
import { Grid } from '@material-ui/core';
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyD-JVvjrWqKZjjWBTkpRaKYyIOsE1adDHU",
  authDomain: "dannyhp-grade-calculator.firebaseapp.com",
  databaseURL: "https://dannyhp-grade-calculator.firebaseio.com",
  projectId: "dannyhp-grade-calculator",
  storageBucket: "dannyhp-grade-calculator.appspot.com",
  messagingSenderId: "487553763912"
};

firebase.initializeApp(config);

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

  reset = () => {
    this.setState({
      categoryID: 0,
      categories: new Map(),
      categoryMapping: new Map(),
      data: new Map(),
      totalWeight: 0.0,
    });
  }

  insertLoadedData = (categoryID, categoryList, categoryMapping, categoryData, totalWeight) => {    
    this.setState({
      categoryID: categoryID,
      categories: categoryList,
      categoryMapping: categoryMapping,
      data: categoryData,
      totalWeight: totalWeight,
    });
  }

  loadData = (username) => {
    var ref = firebase.database().ref('users/' + username)

    ref.on('value', (snapshot) => {
      const userData = snapshot.val();

      var categoryID;
      var categoryMap = new Map();
      var categoryMapping = new Map();
      var categoryData = new Map();
      var totalWeight;

      try {
        for(var i = 0; i < userData.categories.length; ++i) {
          var currentCategory = userData.categories[i];
          categoryMap.set(parseFloat(currentCategory.id), { name: currentCategory.name, weight: parseFloat(currentCategory.weight), id: parseFloat(currentCategory.id) });
        }

        for(var i = 0; i < userData.categoryMapping.length; ++i) {
          var currentCategoryMapping = userData.categoryMapping[i];
          categoryMapping.set(currentCategoryMapping[0], currentCategoryMapping[1]);
        }

        for(var i = 0; i < userData.data.length; ++i) {
          const currentCategoryData = userData.data[i];
          const currentCategoryName = currentCategoryData[0];

          var currentCategoryDataSet = new Map();

          for(var j = 1; j < currentCategoryData.length; ++j) {
            var currentData = currentCategoryData[j];
            currentCategoryDataSet.set(currentData[0], {assignmentName: currentData[1], assignmentScore: currentData[2], assignmentMaxScore: currentData[3] });
          }

          categoryData.set(currentCategoryName, currentCategoryDataSet);
        }

        categoryID = userData.categoryID;
        totalWeight = userData.totalWeight;
      
        this.setState({
          categoryID: 0,
          categories: new Map(),
          categoryMapping: new Map(),
          data: new Map(),
          totalWeight: 0.0,
        });
      } catch(e) {
        alert('There is no data associated with that user!');
        return;
      }

      this.insertLoadedData(categoryID, categoryMap, categoryMapping, categoryData, totalWeight);
    });
  }

  saveData = (username) => {

    var allCategories = [ ];

    for(var [key, value] of this.state.categories) {
      // [categoryName, weight, id]
      allCategories.push(value);
    }

    var categoryMapping = [ ]

    for(var [key, value] of this.state.categoryMapping) {
        // [categoryName, key]
        categoryMapping.push([key, value]);
    }

    var dataMapping = [ ]

    for(var [key, value] of this.state.data) {
        // [categoryName, [dataID, assignmentName, assignmentScore, assignmentMaxScore]]
        const category = key;
        var thisCategory = [key];
        
        for(var [dataId, dataInfo] of value) {
            thisCategory.push([dataId, dataInfo.assignmentName, dataInfo.assignmentScore, dataInfo.assignmentMaxScore]);
        }

        dataMapping.push(thisCategory);
    }

    firebase.database().ref('users/' + username).set({
      username: username,
      categoryID: this.state.categoryID,
      categories: allCategories,
      categoryMapping: categoryMapping,
      data: dataMapping,
      totalWeight: this.state.totalWeight,
    });  
  }

  checkEmptyCategories = () => {
    /* Checks to see if any categories are created. If not, display a message. */
    return (this.state.categories.size === 0);
  }

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

  renderReminder = () => {
    const emptyCategories = this.checkEmptyCategories();
    return (
      <Reminder emptyCategories={emptyCategories} />
    );
  }

  render() {
    return (
      <div className={app}>
    
        <div style={{ background: '#cfdff1',
                        height: '110vh' }}>
            <CssBaseline />
            <AppHeader loadData={this.loadData}
                       saveData={this.saveData}
                       addCategory={this.addCategory}
                       categories={this.state.categories} 
                       currentWeight={this.state.totalWeight}
                       reset={this.reset}/>

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

        {this.renderReminder()}    
      </div>
    );
  }
}

export default App;
