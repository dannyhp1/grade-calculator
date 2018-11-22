import React, { Component } from 'react';
import { css } from 'emotion/macro';
import {
    Toolbar,
    AppBar,
    Typography
} from '@material-ui/core';

const AppHeader = (props) => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit">
            Grade Calculator
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader;