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
          Server is currently down.
	</DialogTitle>
        <DialogContent dividers>
          <Typography style={{ marginBottom: 15 }} gutterBottom>
      We are currently in the midst of setting up our core services on our new AWS server. Our Pastebin and Coderpad
      projects have first priority. Therefore, the option to save/load data has been temporarily disabled. We apologize
      for any inconvenience we may have caused, but we can assure you that we are working swiftly to get the GradeCalculator
      back online. Thank you for your patience.
          </Typography>
          <Divider />
          <Typography style={{ marginTop: 15, marginBottom: 15 }} gutterBottom>
            <em>Last updated: February 19, 2020 at 8:55 PM PST</em>
          </Typography>
          {/* <Typography style={{ marginTop: 15, marginBottom: 15 }} gutterBottom>
            In addition, there are many additional features that are still in development, so 
            expect frequent updates!
          </Typography> */}
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
