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
  constructor (props) {
    super(props);
  };

  render() {
    return (
      <div>
        <Grid container spacing={8}>
          <Grid sm={12} md={6} lg={4} item>
            <Card style={cardStyle}>
              <CardHeader
                title="Category here!"
                subheader="Weight here!"

                action={
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                }
              />
              <CardContent>
                Card content in here!
              </CardContent>
            </Card>
          </Grid>

          <Grid sm={12} md={6} lg={4} item>
            <Card style={cardStyle}>
              <CardHeader
                title="Category here!"
                subheader="Weight here!"

                action={
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                }
              />
              <CardContent>
                Card content in here!
              </CardContent>
            </Card>
          </Grid>

          <Grid sm={12} md={6} lg={4} item>
            <Card style={cardStyle}>
              <CardHeader
                title="Category here!"
                subheader="Weight here!"

                action={
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                }
              />
              <CardContent>
                Card content in here!
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Category;