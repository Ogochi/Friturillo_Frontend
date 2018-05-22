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
    <Grid container alignItems="center" key={name + "point"} wrap="nowrap">
      <LocationIcon style={{marginRight: "1em"}} />
      <span>{name}</span>
    </Grid>
  )

  renderCaption = text => (
    <Typography variant="caption" align="center" key={text + "text"}>
      {text}
    </Typography>
  )

  render() {
    let route = [this.renderStation(this.props.route.data[0].name)];
    for (let i = 1; i < this.props.route.data.length; i++) {
      let timeBetween = this.props.route.data[i].ETA - this.props.route.data[i - 1].ETA;
      let distanceBetween = this.props.route.data[i].length - this.props.route.data[i - 1].length;
      route.push(this.renderCaption(`Czas pomiędzy: ${Math.round(timeBetween / 60)} minut`));
      route.push(this.renderCaption(`Odległość pomiędzy: ${Math.round(distanceBetween / 1000)} km`));
      route.push(this.renderStation(this.props.route.data[i].name));
    }

    let time = Math.round(this.props.route.data.pop().ETA / 60);
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
  route: PropTypes.object,
  returnToForm: PropTypes.func.isRequired,
};

export default FoundRoute;
