import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

const paperStyle = {
  marginTop: "10%", 
  marginLeft: "10%", 
  position: "fixed",
  height: "45%",
  width: "35%",
};

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      iconBarHeight: "100%",
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
  }
  
  render() {
    return (
      <div style={{backgroundImage: "url('map.jpg')", height: this.state.height}}>
        <Paper style={paperStyle}>
          
        </Paper>
      </div>
    );
  }
}

export default App;
