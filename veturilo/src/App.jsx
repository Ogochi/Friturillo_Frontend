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
      start: {value: "", isCorrect: false}, // isCorrect if selected from autocomplete
      destination: {value: "", isCorrect: false},
      stations: [],
      networkErrorModalOpen: false,
      backendErrorModalOpen: false,
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
      this.toggleModal("networkErrorModal")();
    Utils.getStations(this.onStationsReceived, this.toggleModal("networkErrorModal"));
  }

  toggleModal = modalName => () => {
    this.setState( prevState => ({
      [`${modalName}Open`]: !prevState[`${modalName}Open`],
    }));
  }

  onStationsReceived = stations =>
    this.setState({
      stations: stations,
    })

  onInputChange = inputName => value => {
    this.setState({
      [inputName]: value,
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
    Utils.getRoute(this.state.start.value, this.state.destination.value, this.onRouteFound, () => {
      this.toggleModal("backendErrorModal")();
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
                      labels={this.state.stations.map(s => ({name: s.name}))}
                    />
                  </ListItem>
                  <ListItem>
                    <AutoComplete
                      placeholder="Koniec podróży"
                      onChange={this.onInputChange('destination')}
                      labels={this.state.stations.map(s => ({name: s.name}))}
                    />
                  </ListItem>
                  { this.state.start.isCorrect && this.state.destination.isCorrect &&
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
          onClose={this.toggleModal("networkErrorModal")}
          onRetry={this.getStations(false)}
          onCancell={this.toggleModal("networkErrorModal")}
          open={this.state.networkErrorModalOpen}
          title={consts.networkErrorModalTitle}
          content={consts.networkErrorModalContent}
        />
        <NetworkErrorModal
          onClose={this.toggleModal("backendErrorModal")}
          onRetry={this.onSubmitClicked}
          onCancell={this.toggleModal("backendErrorModal")}
          open={this.state.backendErrorModalOpen}
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
