import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Utils from './Utils.js';
import NetworkErrorModal  from './NetworkErrorModal.jsx';

class Stations extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      networkErrorModalOpen: false,
      stations: [],
    };
  }
  
  componentDidMount() {
    this.getStations(true)();
  }
  
  getStations = isItFirstTime => () => {
    if (!isItFirstTime)
      this.toggleNetworkErrorModal();
    Utils.getStations(this.onStationsReceived, this.toggleNetworkErrorModal);
  }
  
  toggleNetworkErrorModal = () => {
    this.setState(prev => ({
      networkErrorModalOpen: !prev.networkErrorModalOpen,
    }));
  }
  
  onStationsReceived = stations => {
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