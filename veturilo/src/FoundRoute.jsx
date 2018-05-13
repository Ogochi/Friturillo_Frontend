import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import LocationIcon from 'material-ui-icons/LocationOn';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

class FoundRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      steps: [],
    };
  }

  renderStation = name => (
    <Grid container alignItems="center">
      <LocationIcon style={{marginRight: "1em"}} />
      <span>{name}</span>
    </Grid>
  )

  renderTimeBetween = time => (
    <Typography variant="caption" align="center">
      Czas pomiędzy: {(time / 60).toPrecision(2)} minut
    </Typography>
  )

  render() {
    let route = [this.renderStation(this.props.route.data[0].name)];
    for (let i = 1; i < this.props.route.data.length; i++) {
      let timeBetween = this.props.route.data[i].ETA - this.props.route.data[i - 1].ETA;
      route.push(this.renderTimeBetween(timeBetween));
      route.push(this.renderStation(this.props.route.data[i].name));
    }

    let time = (this.props.route.data.pop().ETA / 60).toPrecision(2);
    return (
      <div>
        <Grid
          container
          alignItems="center"
          onClick={this.props.returnToForm}
          style={{height: "3em", width: "100%", cursor: "pointer"}}
        >
          <ChevronLeftIcon style={{marginLeft: "1em"}} />
        </Grid>
        <Divider />
        <div style={{margin: "1em"}}>
          {route}
        </div>
        <Divider />
        <div style={{margin: "1em"}}>
          <Grid container justify="center" alignItems="center">
            <Grid item>Pełen czas podróży: {time} minut</Grid>
          </Grid>
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
