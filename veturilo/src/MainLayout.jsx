import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Copyright from 'material-ui-icons/Copyright'

const drawerWidth = 200;
const logoMargin = 20;
const logoStyle = {
  width: drawerWidth - logoMargin,
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "1em",
  marginBottom: "1em",
};
const iconMargin = 3;
const appBarIconStyle = {
  height: "2.5em", 
  marginTop: iconMargin,
  marginLeft: iconMargin + 5,
  marginRight: iconMargin,
  marginBottom: iconMargin,
  verticalAlign: "middle",
};

class MainLayout extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      
    };
  }
  render() {
    const glowna = props => <Link to="/" {...props} />;
    const trasa = props => <Link to="/trasa" {...props} />;
    const kontakt = props => <Link to="/kontakt" {...props} />;
    const stacje = props => <Link to="/stacje" {...props} />;
    
    return (
      <div style={{margin: "0 0 0 0", height: "100%", width: "100%", position: "absolute"}}>  
        <Drawer variant="permanent" anchor="left">
          <div style={{width: drawerWidth, height: "100%", display: "block"}}>
            <img style={logoStyle} src="logo.png" alt="E l i t a r n a Trasa Logo" />
            <Divider />
            <List style={{paddingTop: 0, paddingBottom: 0}}>
              <Button style={{width: drawerWidth}} component={glowna}>Strona Główna</Button>
              <Divider />
              <Button style={{width: drawerWidth}} component={trasa}>Wyszukaj Trase</Button>
              <Divider />
              <Button style={{width: drawerWidth}} component={stacje}>Lista Stacji</Button>
              <Divider />
              <Button style={{width: drawerWidth}} component={kontakt}>Kontakt</Button>
              <Divider />
            </List>
          </div>
          <div style={{display: "inline-block", verticalAlign: "bottom", textAlign: "center"}}>
            <Copyright style={{width: "15px", verticalAlign: "bottom", color: "gray"}} />
            <span style={{addingBottom: "20px", color: "gray"}}>2018 E l i t a r n a Trasa</span>
          </div>
        </Drawer>
        
        <div style={{marginLeft: drawerWidth, height: "100%"}}>
          <div id="iconsBar" style={{textAlign: "right"}}>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
              <img src="youtube.svg" style={appBarIconStyle} alt="YouTube Icon" />
            </a>
            <a href="https://github.com/michal-olt/Veturilo---Frontend">
              <img src="github.svg" style={appBarIconStyle} alt="Github Icon" />
            </a>
            <a href="https://github.com/tosi3k/io">
              <img src="github.svg" style={appBarIconStyle} alt="Github Icon" />
            </a>
          
            <Divider />
          </div>
          
          {this.props.children}
        </div>
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

export default MainLayout;