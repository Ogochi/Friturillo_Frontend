import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

let screenHeight = window.innerHeight || 
  document.documentElement.clientHeight || 
  document.getElementByTagName('body')[0].clientHeight;
let screenWidth = window.innerWidth || 
  document.documentElement.clientWidth || 
  document.getElementByTagName('body')[0].clientWidth;

const shadow = {
  "box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5)",
  marginTop: 10,
  backgroundColor: "white",
  height: "70%",
  width: "100%",
  minHeight: screenHeight * 65 / 100 - 10,
};

const logo = {
  display: "block",
  margin: "0 auto",
  "object-fit": "fill",
  width: screenWidth * 7 / 10,
  height: screenHeight * 3 / 10,
  backgroundColor: "red",
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
      <div style={{marginBottom: 0}}>
        <img style={logo} src="logo.png" />
        
        <div style={shadow}>
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
  children: PropTypes.element
};

export default MainLayout;