import React, { Component } from 'react';
import { css } from 'emotion/macro';
import {
  Toolbar,
  AppBar,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const header = css`
  margin-bottom: 7%;
  font-family: 'Roboto';
`;

class AppHeader extends Component {
  constructor (props) {
    super(props);
  };

  render() {
    return (
      <div className={header}>
        <AppBar style={{ marginBottom: 10 }} 
                color='primary' 
                justify='space-between'>
          <Toolbar>
            <Grid container 
                  justify='space-between' 
                  spacing={24}>
              <Grid item>
                <Button color='inherit' 
                        style={{ height: 40, cursor: 'default', backgroundColor: 'transparent'}} 
                        disableTouchRipple={true}>
                  <Typography variant='title' 
                              color='inherit'>
                    Grade Calculator
                  </Typography>
                </Button>
              </Grid>

              <Grid item>
                <Button onClick={this.props.addCategory}
                        color='inherit' 
                        style={{ height: 40 }}>
                  <AddIcon /> <span style={{ marginLeft: 5 }}>Add Category</span>
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default AppHeader;