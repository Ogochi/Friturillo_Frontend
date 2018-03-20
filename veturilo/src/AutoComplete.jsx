import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';
import List, { ListItem, ListItemText } from 'material-ui/List';
import PropTypes from 'prop-types';

const paperStyle = {
  overflowY: "scroll",
  width: "40%",
  minWidth: "15em",
  height: "40%",
  minHeight: "10em",
  zIndex: 100,
  position: "absolute",
  marginLeft: 20,
};

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      onChange: props.onChange,
      style: props.style,
      placeholder: props.placeholder,
      labels: {name: ""},
      focused: false,
      inputValue: "",
    };
  }
  
  componentWillReceiveProps(props) {
    const listItems = props.labels.map(label => (
      <ListItem key={label.name} button onClick={this.handleListItemClicked}>
        <ListItemText primary={label.name} />
      </ListItem>
    ))

    this.setState({
      labels: listItems,
    });
  }
  
  changeFocus = () => {
    this.setState(prevState => ({
      focused: !prevState.focused,
    }));
  }
  
  handleListItemClicked = event => {
    console.log(event);
  }
  
  handleInputChanged = event => {
    this.setState({
      inputValue: event.target.value,
    });
    
    this.state.onChange(event);
  }
  
  render() {
    return (
      <div>
        <Input 
          placeholder={this.state.placeholder}
          style={this.state.style}
          onChange={this.handleInputChanged}
          onFocus={this.changeFocus}
          onBlur={this.changeFocus}
          value={this.state.inputValue}
        />
        { this.state.focused && this.state.inputValue.length > 2 && 
          <Paper style={paperStyle}>
            <List>
              {this.state.labels.filter(el => {
                return( el.key.includes(this.state.inputValue) );
              }
            )}
            </List>
          </Paper>
        }
      </div>
    );
  }
}

AutoComplete.propTypes = {
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.shape({
     name: PropTypes.string.isRequired,
   }))
};

export default AutoComplete;