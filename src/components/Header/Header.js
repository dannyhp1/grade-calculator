import React, { Component } from 'react';
import {
  Toolbar,
  AppBar,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

class Header extends Component {
  constructor (props) {
    super(props);
  };

  render() {
    return (
      <AppBar style={{ background: '#28559A', fontFamily: 'Roboto', margin: 0, padding: 0 }}
              justify='space-between'
              position="sticky" 
      >
        <Toolbar>
          <Grid justify='space-between' spacing={24} container >
            <Grid item>
              <Button color='inherit' style={{ height: 40, cursor: 'default', backgroundColor: 'transparent'}} disableTouchRipple={true}>
                <Typography variant='title' 
                            color='inherit'>
                  Grade Calculator (Beta)
                </Typography>
              </Button>
            </Grid>

            <Grid item>
              <Button onClick={this.handleOpenLoad} color='inherit' style={{ height: 40 }}>
                <CloudDownloadIcon />
                <span style={{ marginLeft: 5, paddingRight: 0, marginRight: 0, textAlign: 'center' }}>
                  Load
                </span>
              </Button>
              <Button onClick={this.handleOpenSave} color='inherit' style={{ height: 40 }}>
                <CloudUploadIcon />
                <span style={{ marginLeft: 5, paddingRight: 0, marginRight: 0, textAlign: 'center' }}>
                  Save
                </span>
              </Button>
              <Button onClick={this.handleOpenReset} color='inherit' style={{ height: 40 }}>
                <CloseIcon />
                <span style={{ marginLeft: 5 }}>
                  Clear
                </span>
              </Button>
              <Button onClick={this.handleOpenCategory} color='inherit' style={{ height: 40 }}>
                <AddIcon />
                <span style={{ marginLeft: 5 }}>
                  New Category
                </span>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

export default Header;