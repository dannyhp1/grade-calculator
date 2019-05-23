import React, { Component } from 'react'
import { css } from 'emotion/macro';
import {
  Button, 
  Typography
} from '@material-ui/core';

const container = css`
  display: inline;
  text-align: center;
  font-family: 'Roboto';
  padding-top: 10px;
`;

class Grade extends Component {  

  render() {
    return (
      <div className={container}>
        <Button variant='contained' 
                style={{ background: 'green', color: '#ffffff', fontSize: 40,
                         textAlign: 'justify', width: 250, height: 'auto',
                         borderRadius: '35px', cursor: 'default', margin: 25 }}
                disableTouchRipple={true}
        >
          100%
        </Button>

      </div>
    );
  }
}

export default Grade;

