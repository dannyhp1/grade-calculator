import React, { Component } from 'react';
import './App.css';
import AppHeader from '../AppHeader/AppHeader';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <h2>Grade Calculator</h2>
      </div>
    );
  }
}

export default App;
