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

      for(var j = 0; j < amountAssignments; ++j) {
        var current = data[category][j];
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

  getBadges = () => {
    const categories = this.props.categories;

    console.log(categories)

    const results = categories.map((data, index) => {
      if(data.weight < 30.00) {
        return (
          <Badge key={index} color="success">{data.name} ({data.weight}%)</Badge>
        );
      } else if(data.weight >= 30.00 && data.weight <= 50.00) {
        return (
          <Badge key={index} color="info">{data.name} ({data.weight}%)</Badge>
        );
      } else {
        return (
          <Badge key={index} color="danger">{data.name} ({data.weight}%)</Badge>
        );
      }
    });

    return results;
  }

  renderWeightBadges = () => {
    return(
      <div>
        {this.getBadges()}
      </div>
    );
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
        <Typography style={{ marginTop: 20 }} variant='h5' color='inherit'>
          <strong>CURRENT GRADE:</strong>
        </Typography>
        
        <div>
          {this.renderGrade()}
        </div>

        <div>
          {this.renderWeightBadges()}
        </div>

      </div>
    );
  }
}

export default Grade;

