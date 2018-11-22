import React from 'react';
import { 
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardContent,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

let id = 0;
function createData(assignment, score, max) {
  id += 1;
  return { id, assignment, score, max };
}

const rows = [
  createData('Quiz 1', 23, 25),
  createData('Quiz 2', 19, 25),
  createData('Quiz 3', 25, 25),
  createData('Quiz 4', 18, 25),
  createData('Quiz 5', 15, 25),
];

var cardStyle = {
  width: '450px',
  height: 'auto',
  margin: '15px 15px',
  transitionDuration: '0.3s',
}

const Category = (props) => {
  return (
    <div>
      <Card style={cardStyle}>
        <CardContent>
          <Grid container
                style={{ textAlign: 'left' }}
                justify='space-between'
                spacing={24}>
            <Button color='inherit' 
                    style={{ height: 40, cursor: 'default', backgroundColor: 'transparent'}} 
                    disableTouchRipple={true}>
                Quizzes
            </Button>
            <Button style={{ height: 40 }}>
              <AddIcon style={{ color: '#2979ff' }}/>
            </Button>
          </Grid>
          <Table style={{ width: 400, display: 'block' }}>
            <TableHead>
              <TableRow>
                <TableCell>Assignment</TableCell>
                <TableCell numeric>Score</TableCell>
                <TableCell numeric>Maximum Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell>{row.assignment}</TableCell>
                    <TableCell numeric>{row.score}</TableCell>
                    <TableCell numeric>{row.max}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default Category;