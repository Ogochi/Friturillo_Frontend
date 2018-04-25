import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import List, { ListItem } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import Grid from 'material-ui/Grid';
import AutoComplete from './AutoComplete.jsx';
import NetworkErrorModal from './NetworkErrorModal.jsx';
import FoundRoute from './FoundRoute.jsx';
import Utils from './Utils.js';
import consts from './consts.js';

const styles = {
  paper: {
    marginTop: "20%",
    minHeight: "13em",
    minWidth: "18em",
  },
  spinner: {
    margin: "40% auto auto auto",
    top: 0,
    left: 0,
    width: "20%",
    height: "20%",
  },
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: "",
      destination: "",
      stations: [],
      networkErrorModalOpen: false,
      formState: "form",
      route: {},
      height: 0,
    };
  }

  componentDidMount() {
    const barHeight = document.getElementById('appBar').clientHeight;
    const w = window,
    e = document.documentElement,
    g = document.getElementsByTagName('body')[0],
    windowHeight = w.innerHeight|| e.clientHeight|| g.clientHeight;
    this.setState({
      height:  windowHeight - barHeight,
    });

    this.getStations(true)();
  }

  getStations = isItFirstTime => () => {
    if (!isItFirstTime)
      this.toggleNetworkErrorModal();
    Utils.getStations(this.onStationsReceived, this.toggleNetworkErrorModal);
  }

  toggleNetworkErrorModal = () => {
    this.setState( prevState => ({
      networkErrorModalOpen: !prevState.networkErrorModalOpen,
    }));
  }

  onStationsReceived = stations => {
    let stationsNames = stations.map(s => ({
      name: s._attributes.name
    }));

    this.setState({
      stations: stationsNames,
    });
  }

  onInputChange = name => value => {
    this.setState({
      [name]: value,
    });
  }

  changeFormState = newState => () => {
    this.setState({
      formState: newState,
    });
  }

  onSubmitClicked = () => {
    this.changeFormState("waiting")();
    this.getRoute();
  }

  getRoute = () => {
    Utils.getRoute(this.state.start, this.state.destination, this.onRouteFound, () => {
      this.toggleNetworkErrorModal();
      this.changeFormState("form")();
    })
  }

  onRouteFound = route => {
    this.setState({
      route: route,
    });
    this.changeFormState("result")();
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{backgroundImage: "url('map.jpg')", height: this.state.height}}>
        <Grid container direction="row" alignItems="center" justify="center">
          <Grid item>
            <Paper className={classes.paper}>
              { this.state.formState === "form" &&
                <List style={{marginTop: 20}}>
                  <ListItem>
                    <AutoComplete
                      placeholder="Początek podróży"
                      onChange={this.onInputChange('start')}
                      labels={this.state.stations}
                    />
                  </ListItem>
                  <ListItem>
                    <AutoComplete
                      placeholder="Koniec podróży"
                      onChange={this.onInputChange('destination')}
                      labels={this.state.stations}
                    />
                  </ListItem>
                  { this.state.start !== "" && this.state.destination !== "" &&
                  <ListItem>
                    <Button
                      style={{marginLeft: "auto", marginRight: "auto"}}
                      variant="raised"
                      color="primary"
                      onClick={this.onSubmitClicked}
                    >
                      Szukaj
                    </Button>
                  </ListItem>
                  }
                </List>
              }
              { this.state.formState === "waiting" &&
                <Spinner className={classes.spinner} color="blue" name="folding-cube" />
              }
              { this.state.formState === "result" &&
                <FoundRoute returnToForm={this.changeFormState("form")} route={this.state.route} />
              }
            </Paper>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
        <NetworkErrorModal
          onClose={this.toggleNetworkErrorModal}
          onRetry={this.getStations(false)}
          onCancell={this.toggleNetworkErrorModal}
          open={this.state.networkErrorModalOpen}
          title={consts.networkErrorModalTitle}
          content={consts.networkErrorModalContent}
        />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
