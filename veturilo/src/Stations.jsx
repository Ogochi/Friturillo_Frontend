import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Utils from './Utils.js';
import NetworkErrorModal  from './NetworkErrorModal.jsx';
import Spinner from 'react-spinkit';
import LazyLoad, { forceCheck } from 'react-lazyload';
import Search from 'material-ui-icons/Search';
import { InputAdornment } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import consts from './consts.js';

class Stations extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      networkErrorModalOpen: false,
      stations: [],
      spinner: false,
      input: "",
    };
  }
  
  componentDidMount() {
    this.getStations(true)();
  }
  
  componentDidUpdate() {
    forceCheck();
  }
  
  getStations = isItFirstTime => () => {
    this.toggleSpinner();
    if (!isItFirstTime)
      this.toggleNetworkErrorModal();
    Utils.getStations(this.onStationsReceived, () => { 
      this.toggleSpinner(); 
      this.toggleNetworkErrorModal(); 
    });
  }
  
  toggleNetworkErrorModal = () => {
    this.setState(prev => ({
      networkErrorModalOpen: !prev.networkErrorModalOpen,
    }));
  }
  
  toggleSpinner = () => {
    this.setState(prevState => ({
      spinner: !prevState.spinner,
    }));
  }
  
  onStationsReceived = stations => {
    this.toggleSpinner();
    const mappedStations = stations.map(s => ({
      name: s._attributes.name,
      bikes: s._attributes.bikes,
      racks: s._attributes.bike_racks,
      freeRacks: s._attributes.free_racks,
      cords: s._attributes.lat + ", " + s._attributes.lng,
    })).sort((a, b) => {
      return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    });

    this.setState({
      stations: mappedStations,
    });
  }
  
  handleInputChanged = event => {
    this.setState({
      input: event.target.value,
    });
  }
  
  render() {
    return (
      <div>
        <TextField
          placeholder="Szukaj..."
          style={{margin: "1em 1em 1em 1em"}}
          onChange={this.handleInputChanged}
          InputProps={{
            startAdornment: 
            <InputAdornment position="start">
              <Search style={{color: "gray"}} />
            </InputAdornment>,
          }}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nazwa stacji</TableCell>
              <TableCell numeric>Dostępne rowery</TableCell>
              <TableCell numeric>Ilość stojaków</TableCell>
              <TableCell numeric>Wolne stojaki</TableCell>
              <TableCell>Współrzędne</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.state.stations.filter(s => {
              return this.state.input.length === 0 ||
                s.name.toLowerCase().includes(this.state.input.toLowerCase());
            }).map(s => {
            return (
              <LazyLoad once key={s.name + "1"} offset={300} height={"3em"}>
                <TableRow hover>
                  <TableCell>{s.name}</TableCell>
                  <TableCell numeric>{s.bikes}</TableCell>
                  <TableCell numeric>{s.racks}</TableCell>
                  <TableCell numeric>{s.freeRacks}</TableCell>
                  <TableCell>{s.cords}</TableCell>
                </TableRow>
              </LazyLoad>
            );
          })}
          </TableBody>
        </Table>
        { this.state.spinner &&
          <Spinner 
            color="blue" 
            name="folding-cube" 
            style={{
              width: 70, 
              height: 70,
              margin: "auto auto auto auto",
              left: 0, top: 70, bottom: 0, right: 0,
            }} 
          />
        }
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

export default Stations;