import React from 'react';
import {
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';

class Announcement extends React.Component {
  render() {
    return (
      <Dialog open={this.props.show} onClose={this.props.close} aria-labelledby="customized-dialog-title">
        <DialogTitle id="customized-dialog-title">
          Release of Grade Calculator V2!
        </DialogTitle>
        <DialogContent dividers>
          <Typography style={{ marginBottom: 15 }} gutterBottom>
            Grade Calculator has finally been updated and revamped since its initial release back in November
            2018. Numerous amounts of optimizations have been made to ensure that you can use the tool with ease.
          </Typography>
          <Divider />
          <Typography style={{ marginTop: 15, marginBottom: 15 }} gutterBottom>
            Because the application was rebuilt from scratch, it is <em>more than likely </em> that there are bugs. 
            Therefore, if any errors occur while you are using the tool, please report them 
            <a href='https://github.com/dannyhp1/grade-calculator/issues' rel='noopener noreferrer' target='_blank'> here</a>.
          </Typography>
          <Typography style={{ marginTop: 15, marginBottom: 15 }} gutterBottom>
            In addition, there are many additional features that are still in development, so 
            expect frequent updates!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.close} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      // <Dialog open={this.props.show} onClose={this.props.close} aria-labelledby="form-dialog-title">
      //   <DialogTitle id="form-dialog-title">
      //     Save your data:
      //   </DialogTitle>
      //   <DialogContent>
      //     <DialogContentText>
      //       Provide a username to store your data.

      //       <br />
      //       <br />

      //       <strong>Note: </strong> Anyone can use your username to load your data, so make it unique!
      //     </DialogContentText>
      //     <TextField
      //       autoFocus
      //       margin="dense"
      //       id="name"
      //       label="Username"
      //       placeholder="peteranteater"
      //       type="text"
      //       required={true}
      //       onChange={(e) => this.changeName(e)}
      //       // onKeyPress={(e) => this.handleKeyPress(e)}
      //       fullWidth
      //     />
      //   </DialogContent>
      //   <DialogActions>
      //     <Button onClick={this.props.close} color="primary">
      //       Close
      //     </Button>
      //   </DialogActions>
      // </Dialog>
    );
  }
}

export default Announcement;