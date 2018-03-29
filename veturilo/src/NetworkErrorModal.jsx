import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Modal from 'material-ui/Modal';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider'
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  modal: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    marginLeft: "auto", marginRight: "auto", marginTop: "5%", marginBottom: "auto",
    left: 0, right: 0, top: 0, bottom: 0,
    width: "30%",
    height: "30%",
    minHeight: "13em",
    minWidth: "13em",
    padding: theme.spacing.unit * 4,
    textAlign: "center",
  },
});

class NetworkErrorModal extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      open: false,
    }
  }
  
  componentWillReceiveProps(props) {
    this.setState({
      open: props.open,
    });
  }
  
  render() {
    const { classes } = this.props;
    return (
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={this.state.open}
        onClose={this.onClose}
      >
        <div className={classes.modal}>
          <Typography variant="title" id="modal-title">
            {this.props.title}
          </Typography>
          <Divider style={{marginTop: "1em", marginBottom: "1em"}} />
          <Typography variant="subheading" id="modal-description">
            {this.props.content}
          </Typography>
          <div style={{marginTop: "1em"}}>
            <Button
              style={{width: "5em"}}
              variant="raised" 
              color="primary"
              onClick={this.props.onRetry}
            >
              Retry
            </Button>
            <Button
              style={{width: "5em"}}
              variant="raised" 
              color="secondary"
              onClick={this.props.onCancell}
            >
              Cancell
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

NetworkErrorModal.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onRetry: PropTypes.func.isRequired,
  onCancell: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default withStyles(styles)(NetworkErrorModal);