import React, { Component } from 'react';
import Utils from './Utils.js';
import NetworkErrorModal  from './NetworkErrorModal.jsx';

class Stations extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      networkErrorModalOpen: false, 
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
    console.log(stations);
  }
  
  render() {
    return (
      <div>
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