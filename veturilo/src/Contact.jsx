import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from "material-ui/Grid";

const styles = theme => ({
  	button: {
    	margin: theme.spacing.unit * 5,
    	display: 'flex',
    	maxHeight: 10,
	    minWidth: 270,
	    maxWidth: 400,
  	},
  	input: {
    	display: 'none',
  	},
  	root: {
    	display: 'flex',
    	flexWrap: 'wrap',
  	},
  	textField: {
	   	fullWidth: true,
		margin: theme.spacing.unit,
	    minWidth: 270,
	    maxWidth: 400,

  	},
  	formControl: {
	    margin: theme.spacing.unit * 5,
	    minWidth: 270,
	    maxWidth: 400,
  	},
  	selectEmpty: {
    	marginTop: theme.spacing.unit * 2,
  	},
});

class SimpleSelect extends React.Component {
  state = {
    topic: '',
  };


  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      	<form className={classes.root} autoComplete="off" >
      		<Grid container direction="column" alignItems="center" justify="center">
		        <Grid item>
			        <FormControl className={classes.formControl} direction="column">

			          	<InputLabel>W jakiej sprawie się kontaktujesz?</InputLabel>
			          	<Select
				            value={this.state.topic}
				            onChange={this.handleChange}
				            inputProps={{
				              	name: 'topic',
				              	id: 'topic-simple',
				            }}
			          	>
				            <MenuItem value="">
				              <em>wybierz temat...</em>
				            </MenuItem>
				            <MenuItem value={1}>Zgłaszam błąd na stronie</MenuItem>
				            <MenuItem value={2}>Potrzebuję pomocy</MenuItem>
				            <MenuItem value={3}>Propozycja współpracy</MenuItem>
				            <MenuItem value={4}>Inne</MenuItem>
			          	</Select>
			        </FormControl>
			    </Grid>

		        <FormControl className={classes.formControl}>
		          	<TextField
			            required
			          	id="firstName"
			          	label="Imię"
			          	type="text"
		        	/>
		        </FormControl>

		        <FormControl className={classes.formControl}>
		        	<TextField
			          	id="secondName"
			          	label="Nazwisko"
			          	type="text"
		        	/>
		        </FormControl>

		        <FormControl className={classes.formControl}>	
		        	<TextField
		        		required
		              	id="email"
		              	label="Email"
		              	type="email"
		            />
		        </FormControl>

		        <FormControl className={classes.formControl}>
		            <TextField
		              	required
		              	id="message"
		              	label="Wiadomość"
		              	type="text"
		              	multiline
		              	rows="6"
		            />
		        </FormControl>

				<Button variant="raised" color="primary" className={classes.button}>
		       		Wyślij
		      	</Button>
		      </Grid>

      	</form>

    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);
