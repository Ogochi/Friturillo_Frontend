import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Copyright from 'material-ui-icons/Copyright'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import MenuIcon from 'material-ui-icons/Menu';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import consts from './consts.js';

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
const buttonStyle = {
  width: drawerWidth,
};
const styles = theme => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

class MainLayout extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      drawerOpen: true,
      mobile: false,
    }
  }
  
  componentDidMount() {
    const w = window,
    e = document.documentElement,
    g = document.getElementsByTagName('body')[0];
    const width = w.innerWidth|| e.clientWidth|| g.clientWidth;
    if (width < consts.mobileWebsiteWidth)
      this.setState({
        drawerOpen: false,
        mobile: true,
      });
  }
  
  toggleMenu = () => {
    this.setState(prev => ({
      drawerOpen: !prev.drawerOpen,
    }));
  }
  
  render() {
    const { classes } = this.props;
    const glowna = props => <Link to="/" {...props} />;
    const trasa = props => <Link to="/trasa" {...props} />;
    const kontakt = props => <Link to="/kontakt" {...props} />;
    const stacje = props => <Link to="/stacje" {...props} />;
    const appMargin = this.state.drawerOpen ? drawerWidth : 0;
    const displayAppBarIcons = this.state.drawerOpen && this.state.mobile ?
      {display: "none"} : {};
    
    return (
      <div style={{margin: "0 0 0 0", height: "100%", width: "100%", position: "absolute"}}>  
        <Drawer variant="persistent" anchor="left" open={this.state.drawerOpen}>
          <div onClick={this.toggleMenu} className={classes.drawerHeader}>
            <ChevronLeftIcon />
          </div>
          <Divider />
          <div style={{width: drawerWidth, height: "100%", display: "block"}}>
            <Link to="/">
              <img style={logoStyle} src="logo.png" alt="E l i t a r n a Trasa Logo" />
            </Link>
            <Divider />
            <List style={{paddingTop: 0, paddingBottom: 0}}>
              <Button style={buttonStyle} component={glowna}>Strona Główna</Button>
              <Divider />
              <Button style={buttonStyle} component={trasa}>Wyszukaj Trase</Button>
              <Divider />
              <Button style={buttonStyle} component={stacje}>Lista Stacji</Button>
              <Divider />
              <Button style={buttonStyle} component={kontakt}>Kontakt</Button>
              <Divider />
            </List>
          </div>
          <div style={{display: "inline-block", verticalAlign: "bottom", textAlign: "center"}}>
            <Copyright style={{width: "15px", verticalAlign: "bottom", color: "gray"}} />
            <span style={{addingBottom: "20px", color: "gray"}}>2018 E l i t a r n a Trasa</span>
          </div>
        </Drawer>
        
        <AppBar position="sticky" color="default" id="appBar">
          <Toolbar style={{marginLeft: appMargin, display: "flex", justifyContent: "space-between"}}>
            { !this.state.drawerOpen &&
              <IconButton color="inherit" aria-label="Menu" style={{marginRight: "1em"}}>
                <MenuIcon onClick={this.toggleMenu} />
              </IconButton>
            }
            <Typography variant="title" color="inherit">
              Friturillo
            </Typography>
            <div style={displayAppBarIcons}>
              <a href="https://github.com/Ogochi/Veturilo---Frontend">
                <img src="github.svg" style={appBarIconStyle} alt="Github Icon" />
              </a>
              <a href="https://github.com/tosi3k/io">
                <img src="github.svg" style={appBarIconStyle} alt="Github Icon" />
              </a>
            </div>
          </Toolbar>
        </AppBar>
        
        <div style={{marginLeft: appMargin}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainLayout);