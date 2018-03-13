import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import List, { ListItem } from 'material-ui/List';

const paperStyle = {
  marginTop: "10%", 
  marginLeft: "10%", 
  position: "fixed",
  height: "45%",
  width: "18em",
};

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      iconBarHeight: "100%",
      start: "",
      destination: "",
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
              <Input
                style={{marginTop: 20, marginLeft: 20}}
                placeholder="Początek podróży"
                onChange={this.onInputChange('start')}
              />
            </ListItem>
            <ListItem>
              <Input
                style={{marginLeft: 20}}
                placeholder="Koniec podróży"
                onChange={this.onInputChange('destination')}
              />
            </ListItem>
            { this.state.start != "" && this.state.destination != "" &&
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
