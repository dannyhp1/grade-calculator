import React, { Component } from 'react'
import { css } from 'emotion/macro';
import {
  Button, 
  Typography
} from '@material-ui/core';
import Badge from '../Badge/Badge.jsx';


const container = css`
  display: inline;
  text-align: center;
  font-family: 'Roboto';
  padding-top: 10px;
`;

class Grade extends Component {  
  getGrade = () => {
    const data = this.props.data;
    const categories = this.props.categories;

    var totalWeight = 0.0;
    var userWeight = 0.0;
    var currentPercent = 0.0;

    for(var [category, weight] of categories) {
      /* If the category has assignments in it, take it under consideration. */
      const categoryData = data.get(category);
      const assignmentsAmount = categoryData.size;
      if(assignmentsAmount > 0) {
        totalWeight += parseFloat(weight);

        var userScore = 0;
        var maxScore = 0;
        
        for(var [id, assignmentDetails ] of categoryData) {
          userScore += parseFloat(assignmentDetails.assignmentScore);
          maxScore += parseFloat(assignmentDetails.assignmentMaxScore);
        }

        const categoryScore = parseFloat(userScore) / parseFloat(maxScore);
        if(!isNaN(categoryScore)) {
          const calculatedScore = categoryScore * parseFloat(weight);
          userWeight += calculatedScore;
        }
      }
    }

    const decimalScore = parseFloat(userWeight) / parseFloat(totalWeight);
    if(!isNaN(decimalScore)) {
      currentPercent = decimalScore * 100;
    }

    return currentPercent;
  }

  getBadges = () => {
    var badgeData = [ ]
    const categories = this.props.categories;

    for(var [category, weight] of categories) {
      badgeData.push({name: category, weight: weight});
    }

    const badge = badgeData.map((data, index) => {
      if(data.weight < 30.00) {
        return (
          <Badge key={index} color="success">
            {data.name} ({data.weight}%)
          </Badge>
        );
      } else if(data.weight >= 30.00 && data.weight < 50.00) {
        return (
          <Badge key={index} color="info">
            {data.name} ({data.weight}%)
          </Badge>
        );
      } else {
        return (
          <Badge key={index} color="danger">
            {data.name} ({data.weight}%)
          </Badge>
        );
      }
    });

    return badge;
  }

  renderBadges = () => {
    return(
      <div>
        {this.getBadges()}
      </div>
    );
  }

  renderGrade = () => {
    /* Colors go in the order of: red, orange, green, dark green.
    Percentiles are from: (0.00 - 69.99, 70.00 - 79.99, 80.00 - 89.99, 90.00+) */
    const colors = ['#b2102f', '#ff9800', '#4caf50', '#357a38'];
    const currentGrade = this.getGrade();
    var displayColor = '';

    if(currentGrade < 70.00) {
      displayColor = colors[0];
    } else if(currentGrade >= 70.00 && currentGrade < 80.00) {
      displayColor = colors[1];
    } else if(currentGrade >= 80.00 && currentGrade < 90.00) {
      displayColor = colors[2];
    } else {
      displayColor = colors[3];
    }

    /* Show the grade rounded by 2 decimal places. */
    const displayGrade = currentGrade.toFixed(2);

    return (
      <Button variant='contained' 
              style={{ background: displayColor, color: '#ffffff', fontFamily: 'Roboto',
                       fontSize: 40, textAlign: 'justify', width: 250, height: 'auto',
                       borderRadius: '35px', cursor: 'default', marginBottom: 20 }}
              disableTouchRipple={true}>
      {displayGrade}%
      </Button>
    )
  }

  render() {
    return (
      <div className={container}>
        <Typography style={{ marginTop: 20 }} variant='h5' color='inherit'>
          <strong>CURRENT GRADE:</strong>
        </Typography>
        
        <div>
          {this.renderGrade()}
        </div>

        <div>
          {this.renderBadges()}
        </div>

      </div>
    );
  }
}

export default Grade;

