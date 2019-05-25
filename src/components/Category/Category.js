import React, {Component} from 'react';
import { 
  Grid,
  Button,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

var cardStyle = {
  height: 'auto',
  margin: '1.5% 5%',
  transitionDuration: '0.3s',
  background: '#C2D0DC',
  color: '#000000',
}
class Category extends Component {
  addAssignment = () => {
    this.props.openNewAssignment(this.props.category['id'], this.props.category['aid']);
  }

  modifyAssignment = () => {
    this.props.openModifyCategory(this.props.category['id']);
  }

  renderAssignments = () => {
    const assignments = this.props.category['assignments'];

    return assignments.map((assignment, index) => (
      <TableRow key={index}>
        <TableCell>
          {assignment['name']}
        </TableCell>
        <TableCell numeric>
          {assignment['score']}
        </TableCell>
        <TableCell numeric>
          {assignment['max']}
        </TableCell>
      </TableRow>
    ));
  }

  getHeader = () => {
    return (
      <Button style={{ width: '100%' }} onClick={this.modifyAssignment}>
        {this.props.category['name']} - {this.props.category['weight']}%
      </Button>
    );
  }

  render() {
    return (
      <Grid sm={12} md={6} lg={4} item>
        <Card style={cardStyle}>
          <CardHeader
            title={this.getHeader()}
            action={
              <IconButton style={{ marginRight: 10 }} onClick={this.addAssignment}>
                <AddIcon />
              </IconButton>
            }
            style={{ marginBottom: 0, paddingBottom: 0 }}
          />
          <CardContent style={{ width: '100%' }}>
            <Table style={{ display: 'block', color: '#000000' }}>
              <TableHead>
                <TableRow>
                  <TableCell>Assignment</TableCell>
                  <TableCell numeric>Score</TableCell>
                  <TableCell numeric>Max</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.renderAssignments()}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default Category;