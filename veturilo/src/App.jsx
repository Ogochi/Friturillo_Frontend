import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import List, { ListItem } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import converter from 'xml-js';
import axios from 'axios';
import AutoComplete from './AutoComplete.jsx';
import NetworkErrorModal from './NetworkErrorModal.jsx';

const styles = {
  paper: {
    marginTop: "10%", 
    marginLeft: "10%", 
    position: "fixed",
    height: "45%",
    width: "18em",
    minHeight: "11em"
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      iconBarHeight: "100%",
      start: "",
      destination: "",
      stations: [],
      networkErrorModalOpen: false,
    };
  }
  
  componentDidMount() {
    const barHeight = document.getElementById('iconsBar').clientHeight;
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

    axios.get(`http://api.nextbike.net/maps/nextbike-official.xml?city=210`, {
      timeout: 2000,
    })
      .then(res => {
        let stations = JSON.parse(
          converter.xml2json(res.data, {compact: true, spaces: 4}))
            .markers.country.city.place;
        let stationsNames = stations.map(s => ({
          name: s._attributes.name
        }));

        this.setState({
          stations: stationsNames,
        });
      })
      .catch(() => {
        this.toggleNetworkErrorModal();
      })
  }
  
  toggleNetworkErrorModal = () => {
    this.setState( prevState => ({
      networkErrorModalOpen: !prevState.networkErrorModalOpen,
    }));
  }
  
  onInputChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }
  
  onSubmitClicked = () => {
    alert("Submit clicked!");
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div style={{backgroundImage: "url('map.jpg')", height: this.state.height}}>
        <Paper className={classes.paper} display="list-item">
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
        </Paper>
        <NetworkErrorModal 
          onClose={this.toggleNetworkErrorModal}
          onRetry={this.getStations(false)}
          onCancell={this.toggleNetworkErrorModal}
          open={this.state.networkErrorModalOpen}
        />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
