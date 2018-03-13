import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';

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
    
    return (
      <div style={{margin: "0 0 0 0"}}>
        
        
        <Drawer variant="permanent" anchor="left">
          <div style={{width: drawerWidth, height: "100%", display: "block"}}>
            <img style={logoStyle} src="logo.png" />
            <Divider />
          </div>
        </Drawer>
        
        <div style={{marginLeft: drawerWidth}}>
          <div style={{textAlign: "center"}}>
            <Button style={{width: "15em"}} component={glowna}>Strona Główna</Button>
            <Button style={{width: "15em"}} component={trasa}>Wyszukaj Trasę</Button>
            <Button style={{width: "15em"}} component={kontakt}>Kontakt</Button>
          </div>
          <Divider />
          
          {this.props.children}
        </div>
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.element,
};

export default MainLayout;