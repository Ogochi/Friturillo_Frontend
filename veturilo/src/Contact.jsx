import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing.unit,
    minWidth: 400,
  },
  formControl: {
    margin: theme.spacing.unit * 5,
    minWidth: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SimpleSelect extends React.Component {
  state = {
    age: '',
  };

  handleChangeSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          	<InputLabel htmlFor="age-simple">W jakiej sprawie się kontaktujesz?</InputLabel>
          	<Select
	            value={this.state.age}
	            onChange={this.handleChangeSelect}
	            inputProps={{
	              name: '',
	              id: '',
	            }}
          	>
            <MenuItem value="">
              <em>wybierz temat...</em>
            </MenuItem>
            <MenuItem value={10}>Zgłaszam błąd na stronie</MenuItem>
            <MenuItem value={20}>Potrzebuję pomocy</MenuItem>
            <MenuItem value={30}>Propozycja współpracy</MenuItem>
            <MenuItem value={40}>Inne</MenuItem>

          	</Select>
          	<TextField
	            autoFocus
	          	id="firstName"
	          	label="Imię"
	          	type="text"
              	fullWidth
              	margin="dense"

        	/>
          	<TextField
	          	id="secondnName"
	          	label="Nazwisko"
	          	type="text"
              	fullWidth
              	margin="dense"
        	/>
        	<TextField
              	id="email"
              	label="Email"
              	type="email"
              	margin="dense"
              	fullWidth
            />
            <TextField
              	id="message"
              	label="Wiadomość"
              	type="text"
              	margin="normal"
              	multiline
              	rows="6"
            />

        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);
