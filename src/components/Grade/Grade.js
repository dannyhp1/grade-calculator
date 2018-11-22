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

  getGrade = () => {
    const data = this.props.data;
    const categories = this.props.categories;
    var amountCategories = categories.length;

    // Create a hash map to store the category and its scores.
    var categoryScores = new Map();
    
    // Total percent available (not always 100%).
    var totalWeight = 0.0;

    // The amount that the user has (relative to totalWeight).
    var userWeight = 0.0;

    // This is your current grade percent.
    var currentPercent = 0.0;

    for(var i = 0; i < amountCategories; ++i) {
      categoryScores.set(categories[i].name, parseFloat(categories[i].weight));
      // If the category is there, but there are no assignments in them. Don't count it.
      if(data[categories[i].name].length > 0) {
        totalWeight += parseFloat(categories[i].weight);
      }
    }

    for (var [category, weight] of categoryScores) {
      var userScore = 0;
      var maxScore = 0;
      const amountAssignments = data[category].length;

      for(var i = 0; i < amountAssignments; ++i) {
        var current = data[category][i];
        userScore += current.assignmentScore;
        maxScore += current.assignmentMaxScore;
      }

      var currentCategoryScore = parseFloat(userScore)/parseFloat(maxScore);
      if(!isNaN(currentCategoryScore)) {
        var calculatedScore = currentCategoryScore * parseFloat(weight);
        userWeight += calculatedScore
      }
    }

    var decimalScore = (userWeight / totalWeight);
    if(!isNaN(decimalScore)) {
      currentPercent = decimalScore * 100;
    }    

    return currentPercent;
  }

  renderGrade = () => {
    const currentGrade = this.getGrade();

    // Colors go in the order of: red, orange, green, dark green.
    // Percentiles are from: (0.00 - 69.99, 70.00 - 79.99, 80.00 - 89.99, 90.00+)
    var colors = ['#b2102f', '#ff9800', '#4caf50', '#357a38'];
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
        <Typography variant='h5' color='inherit'>
          CURRENT GRADE:
        </Typography>
        
        {this.renderGrade()}
  
      </div>
    );
  }
}

export default Grade;

