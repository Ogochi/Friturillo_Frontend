import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Utils from './Utils.js';
import NetworkErrorModal  from './NetworkErrorModal.jsx';
import Spinner from 'react-spinkit';

class Stations extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      networkErrorModalOpen: false,
      stations: [],
      spinner: false,
    };
  }
  
  componentDidMount() {
    this.getStations(true)();
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
    }));

    this.setState({
      stations: mappedStations,
    });
  }
  
  render() {
    return (
      <div>
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
          {this.state.stations.map(s => {
            return (
              <TableRow key={s.name + "11"}>
                <TableCell>{s.name}</TableCell>
                <TableCell numeric>{s.bikes}</TableCell>
                <TableCell numeric>{s.racks}</TableCell>
                <TableCell numeric>{s.freeRacks}</TableCell>
                <TableCell>{s.cords}</TableCell>
              </TableRow>
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
        />
      </div>
    );
  }
}

export default Stations;