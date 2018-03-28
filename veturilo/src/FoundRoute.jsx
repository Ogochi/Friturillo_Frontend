import React, { Component } from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';

class FoundRoute extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      steps: [],
    };
  }
  
  render() {
    return (
      <div>
        <Button 
          variant="raised" 
          color="primary" 
          onClick={this.props.returnToForm}
          style={{margin: "1em 1em 1em 1em"}}
        >
          Powrót
        </Button>
      </div>
    );
  }
}

FoundRoute.propTypes = {
  returnToForm: PropTypes.func.isRequired,
};

export default FoundRoute;