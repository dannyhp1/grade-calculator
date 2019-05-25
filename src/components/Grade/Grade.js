import React, { Component } from 'react'
import { css } from 'emotion/macro';
import {
  Button, 
} from '@material-ui/core';

const container = css`
  display: inline;
  text-align: center;
  font-family: 'Roboto';
  padding-top: 10px;
`;

class Grade extends Component {
  calculateGrade = () => {
    let totalWeight = 0.00;
    let totalGrade = 0.00;

    const categories = this.props.categories;

    for(let i = 0; i < categories.length; ++i) {
      const weight = categories[i]['weight'];
      const assignments = categories[i]['assignments'];
      
      let totalScore = 0;
      let totalMax = 0;

      for(let j = 0; j < assignments.length; ++j) {
        totalScore += assignments[j]['score'];
        totalMax += assignments[j]['max'];
      }
      
      const scorePercent = parseFloat(totalScore) / parseFloat(totalMax);
      const weightedPercent = parseFloat(scorePercent) * weight;

      if(assignments.length !== 0) {
        totalWeight += parseFloat(weight);
        totalGrade += parseFloat(weightedPercent);
      }
    }

    let overallGrade = parseFloat(totalGrade) / parseFloat(totalWeight);
    overallGrade = (isNaN(overallGrade)) ? 0 : overallGrade * 100;

    return overallGrade.toFixed(2);
  }

  getGradeColor = (grade) => {
    const colors = ['#aa2e25', '#f44336', '#ff9800', '#6fbf73', '#4caf50', '#357a38'];
    console.log(grade);

    if(grade < 60.00) {
      return colors[0];
    } else if(grade >= 60.00 && grade < 70.00) {
      return colors[1];
    } else if(grade >= 70.00 && grade < 80.00) {
      return colors[2];
    } else if(grade >= 80.00 && grade < 90.00) {
      return colors[3];
    } else if(grade >= 90.00 && grade < 100.00) {
      return colors[4];
    } else {
      return colors[5];
    }
  }

  render() {

    const grade = this.calculateGrade();
    const color = this.getGradeColor(grade);

    return (
      <div className={container}>
        <Button variant='contained' 
                style={{ background: color, color: '#ffffff', fontSize: 40,
                         textAlign: 'justify', width: 250, height: 'auto',
                         borderRadius: '35px', cursor: 'default', margin: 25 }}
                disableTouchRipple={true}
        >
          {grade}%
        </Button>

      </div>
    );
  }
}

export default Grade;

