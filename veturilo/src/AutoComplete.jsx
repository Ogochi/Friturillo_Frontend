import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';
import List, { ListItem } from 'material-ui/List';

const paperStyle = {
  overflowY: "scroll",
  width: "40%",
  minWidth: "15em",
  height: "30%",
  minHeight: "3em",
};

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      onChange: props.onChange,
      style: props.style,
      placeholder: props.inputPlaceholder,
    };
  }
  
  onFocus = () => {
    alert("Focus!");
  }
  
  onBlur = () => {
    alert("Blur!");
  }
  
  render() {
    return (
      <div>
        <Input 
          placeholder={this.state.placeholder}
          style={this.state.style}
          onChange={this.state.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        { this.state.focused && 
          <Paper style={paperStyle}>
            <List>
              <ListItem>
                asdasd
              </ListItem>
            </List>
          </Paper>
        }
      </div>
    );
  }
}

export default AutoComplete;