import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { css } from 'emotion/macro';
import firebase from 'firebase';

import Header from '../Header/Header';
import Grade from '../Grade/Grade';
import Category from '../Category/Category';

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
  background: '#cfdff1';
  text-align: center;
`;

class App extends Component {
  constructor (props) {
    super(props);
  };

  render() {
    return (
      <div className={app} style={{ fontFamily: 'Roboto' }}>
        <CssBaseline />
        <Header />
        <Grade />
        <Category />
      </div>
    );
  }
}

export default App;