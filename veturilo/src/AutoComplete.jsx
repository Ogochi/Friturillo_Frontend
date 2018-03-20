import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Chip from 'material-ui/Chip';
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
      placeholder: props.placeholder,
      labels: {name: ""},
      focused: false,
      inputValue: "",
      inputLength: 0,
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
    setTimeout(() => {
      this.setState(prevState => ({
        focused: !prevState.focused,
      }));
    }, 100);
  }
  
  handleListItemClicked = event => 
    this.changeInput(event.target.childNodes[0].data)
  
  handleInputChanged = event => {
    this.changeInput(event.target.value);
    
    this.state.onChange(event);
  }
  
  changeInput = value => {
    this.setState({
      inputValue: value,
      inputLength: value.length,
    });
  }
  
  render() {
    return (
      <div>
        <Chip
          onDelete={() => this.changeInput("")}
          style={{height: "3em"}}
          label={
            <Input 
              placeholder={this.state.placeholder}
              onChange={this.handleInputChanged}
              onFocus={this.changeFocus}
              onBlur={this.changeFocus}
              value={this.state.inputValue}
            />
          }
        />
        
        { this.state.focused && this.state.inputLength >= 2 && 
          <Paper style={paperStyle}>
            <List>
              {this.state.labels.filter(el => {
                return( el.key.toLowerCase().includes(this.state.inputValue.toLowerCase()) );
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
  placeholder: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.shape({
     name: PropTypes.string.isRequired,
   }))
};

export default AutoComplete;