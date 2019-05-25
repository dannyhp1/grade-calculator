import React, {Component} from 'react';
import { 
  Grid,
  Button,
  Card,
  CardHeader,
  CardContent,
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

  modifyCategory = () => {
    this.props.openModifyCategory(this.props.category['id']);
  }

  modifyAssignment = (id) => {
    this.props.openModifyAssignment(this.props.category['id'], id);
  }

  renderAssignments = () => {
    const assignments = this.props.category['assignments'];

    return assignments.map((assignment, index) => (
      <tr key={index} onClick={(e) => this.modifyAssignment(assignment['id'])}>
        <td>{assignment['name']}</td>
        <td>{assignment['score']}</td>
        <td>{assignment['max']}</td>
      </tr>
    ));
  }

  getHeader = () => {
    return (
      <Button style={{ width: '100%' }} onClick={this.modifyCategory}>
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
              <IconButton style={{ marginRight: 10, marginTop: 7.5 }} onClick={this.addAssignment}>
                <AddIcon />
              </IconButton>
            }
            style={{ marginBottom: 0, paddingBottom: 0 }}
          />
          <CardContent style={{ width: '100%', textAlign: 'center' }}>
            <table className="table table-hover">
              <thead className="thead">
                <tr>
                  <th scope="col">Assignment</th>
                  <th scope="col">Score</th>
                  <th scope="col">Max</th>
                </tr>
              </thead>
              <tbody>
                {this.renderAssignments()}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </Grid>

      // <Grid sm={12} md={6} lg={4} item>
      //   <Card style={cardStyle}>
      //     <CardHeader
      //       title={this.getHeader()}
      //       action={
      //         <IconButton style={{ marginRight: 10 }} onClick={this.addAssignment}>
      //           <AddIcon />
      //         </IconButton>
      //       }
      //       style={{ marginBottom: 0, paddingBottom: 0 }}
      //     />
      //     <CardContent style={{ width: '100%' }}>
      //       <Table style={{ display: 'block', color: '#000000', textAlign: 'center', width: '100%' }}>
      //         <span style={{ width: '100%', textAlign: 'center' }}>
      //           <TableHead>
      //             <TableRow>
      //               <TableCell>Assignment</TableCell>
      //               <TableCell numeric>Score</TableCell>
      //               <TableCell numeric>Max</TableCell>
      //             </TableRow>
      //           </TableHead>
      //         </span>
      //         <TableBody>
      //           <Grid container>
      //             {this.renderAssignments()}
      //           </Grid>
      //         </TableBody>
      //       </Table>
      //     </CardContent>
      //   </Card>
      // </Grid>
    );
  }
}

export default Category;