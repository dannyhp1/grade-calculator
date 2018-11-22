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

  }

  handleAddCategory = () => {

    alert('Clicked!')

  };

  render() {
    return (
      <div className={app}>
        <CssBaseline />
        <AppHeader addCategory={this.handleAddCategory}/>
          
        <Grade />

        <Grid style={{display: 'flex', flexWrap: 'wrap' }}>
          <Category />
          <Category />
          <Category />
          <Category />
        </Grid>

      </div>
    );
  }
}

export default App;
