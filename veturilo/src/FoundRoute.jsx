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
    let route = this.props.route.data.map(station => {
      return (<div key={station.name}>{station.name} | {station.ETA / 60 | 0} minut</div>)
    });
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
        {route}
      </div>
    );
  }
}

FoundRoute.propTypes = {
  route: PropTypes.arrayOf(PropTypes.element),
  returnToForm: PropTypes.func.isRequired,
};

export default FoundRoute;
