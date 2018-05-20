/* global google */
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Input, { InputAdornment } from 'material-ui/Input';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Cancel from 'material-ui-icons/Cancel';
import MyLocation from 'material-ui-icons/MyLocation';
import Chip from 'material-ui/Chip';
import PropTypes from 'prop-types';
import NetworkErrorModal from './NetworkErrorModal.jsx';
import Utils from './Utils.js';
import consts from './consts.js';

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
      labels: [],
      focused: false,
      inputValue: "",
      inputLength: 0,
      modalOpen: false,
      autoCompleteService: new google.maps.places.AutocompleteService(),
      googlePredictions: [],
    };
  }

  componentWillReceiveProps(props) {
    const listItems = props.labels.map(label => this.renderLabel(label.name));

    this.setState({
      labels: listItems,
      modalOpen: false,
    });
  }

  renderLabel = labelName => (
    <div key={labelName} onMouseDown={this.handleListItemClicked}>
      <ListItem key={labelName} button>
        <ListItemText primary={labelName} />
      </ListItem>
      <Divider />
    </div>
  )

  changeFocus = () => {
    this.setState(prevState => ({
      focused: !prevState.focused,
    }));
  }

  handleListItemClicked = event => {
    /* Sometimes input loses focus faster than we can capture event target
     * correctly so we persist event.
     */
    event.persist();
    this.changeInput({value: event.target.innerText, isCorrect: true});
  }

  handleInputChanged = event => {
    this.changeInput({value: event.target.value, isCorrect: false});
    if (event.target.value.length >= 2) {
      this.state.autoCompleteService.getPlacePredictions({
        componentRestrictions: {country: 'pl'},
        input: event.target.value,
        location: new google.maps.LatLng({lat: 52.226071, lng:21.006777}),
        radius: 10000,
        types: ["address"],
      }, res => {
        console.log(res);
        let predictions = [];
        res.forEach(p => {
          if (p.description.includes("Warszawa")) {
            predictions.push(this.renderLabel(p.description));
          }
        });
        this.setState({
          googlePredictions: predictions,
        });
      });
    }
  }

  changeInput = input => {
    this.setState(prev => ({
      inputValue: input.value,
      inputLength: input.value.length,
    }));
    this.state.onChange(input);
  }

  searchLocation = () => {
    Utils.getLocation(pos => {
      this.changeInput({
        value: pos.coords.latitude + "," + pos.coords.longitude,
        isCorrect: true,
      });
    }, () => {
      this.toggleNetworkErrorModal();
    });
  }

  toggleNetworkErrorModal = () => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
    }));
  }

  render() {
    const filteredLabels = this.state.labels.filter(el => {
      return( el.key.toLowerCase().includes(this.state.inputValue.toLowerCase()) );
    }
  )
    return (
      <div>
        <Chip
          style={{height: "3em"}}
          label={
            <Input
              fullWidth
              placeholder={this.state.placeholder}
              onChange={this.handleInputChanged}
              onFocus={this.changeFocus}
              onBlur={this.changeFocus}
              value={this.state.inputValue}
              endAdornment={
                <InputAdornment>
                  {this.state.inputLength ?
                    (<Cancel style={{color: "gray"}} onClick={() => this.changeInput({value: ""})} />) :
                    (<MyLocation style={{color: "gray"}} onClick={this.searchLocation} />)
                  }
                </InputAdornment>
              }
            />
          }
        />

        { this.state.focused && this.state.inputLength >= 2 &&
          filteredLabels.length + this.state.googlePredictions.length > 0 &&
          <Paper style={paperStyle}>
            <List>
              {filteredLabels}
              {this.state.googlePredictions}
            </List>
          </Paper>
        }

        <NetworkErrorModal
          onClose={this.toggleNetworkErrorModal}
          onRetry={this.searchLocation}
          onCancell={this.toggleNetworkErrorModal}
          open={this.state.modalOpen}
          title={consts.gpsErrorModalTitle}
          content={consts.gpsErrorModalContent}
        />
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
