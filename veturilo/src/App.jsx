import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import List, { ListItem } from 'material-ui/List';
import converter from 'xml-js';
import axios from 'axios';
import AutoComplete from './AutoComplete.jsx'

const paperStyle = {
  marginTop: "10%", 
  marginLeft: "10%", 
  position: "fixed",
  height: "45%",
  width: "18em",
  minHeight: "11em"
};

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      iconBarHeight: "100%",
      start: "",
      destination: "",
      stations: [],
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
    
    axios.get(`http://api.nextbike.net/maps/nextbike-official.xml?city=210`)
      .then(res => {
        if (res.statusText === "OK") {
          let stations = JSON.parse(
            converter.xml2json(res.data, {compact: true, spaces: 4}))
              .markers.country.city.place;
          let stationsNames = stations.map(s => ({
            name: s._attributes.name
          }));

          this.setState({
            stations: stationsNames,
          });
        } else {
          alert("Error - failed to download stations data!");
        }
      });
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
    return (
      <div style={{backgroundImage: "url('map.jpg')", height: this.state.height}}>
        <Paper style={paperStyle} display="list-item">
          <List>
            <ListItem>
              <AutoComplete
                style={{marginTop: 20, marginLeft: 20}}
                placeholder="Początek podróży"
                onChange={this.onInputChange('start')}
                labels={this.state.stations}
              />
            </ListItem>
            <ListItem>
              <AutoComplete
                style={{marginLeft: 20}}
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
      </div>
    );
  }
}

export default App;
