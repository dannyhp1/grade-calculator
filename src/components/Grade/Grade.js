import React, { Component } from 'react'
import { css } from 'emotion/macro';
import {
  Button, 
  Typography
} from '@material-ui/core';

const container = css`
  display: inline;
  text-align: center;
  padding-top: 10px;
`;

class Grade extends Component {
  constructor (props) {
    super(props);
  };

  renderGrade = () => {
    var colors = ['#b2102f', '#ff9800', '#4caf50'];

    var displayColor = colors[0];
    return (
      <Button variant='contained' 
              style={{ background: displayColor, color: '#ffffff', fontFamily: 'Roboto',
                       fontSize: 40, textAlign: 'justify', width: 250, height: 'auto',
                       borderRadius: '35px', cursor: 'default', marginBottom: 20 }}
              disableTouchRipple={true}>
      0.00%
      </Button>
    )
  }

  render() {
    return (
      <div className={container}>
        <Typography variant='h5' color='inherit'>
          CURRENT GRADE:
        </Typography>
        
        {this.renderGrade()}
  
      </div>
    );
  }
}

export default Grade;

