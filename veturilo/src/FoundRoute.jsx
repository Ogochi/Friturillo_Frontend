import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';

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
        <Grid
          container
          alignItems="center"
          onClick={this.props.returnToForm}
          style={{height: "3em", width: "100%"}}
        >
          <ChevronLeftIcon style={{marginLeft: "1em"}} />
        </Grid>
        <Divider />
        <div style={{margin: "1em 1em 1em 1em"}}>
          {route}
        </div>
      </div>
    );
  }
}

FoundRoute.propTypes = {
  route: PropTypes.arrayOf(PropTypes.element),
  returnToForm: PropTypes.func.isRequired,
};

export default FoundRoute;
