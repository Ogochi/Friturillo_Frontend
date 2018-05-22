import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import {FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from "material-ui/Grid";
import {Paper} from "material-ui";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        marginTop: theme.spacing.unit * 4,
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
        padding: 20,
    },
    textField: {
        fullWidth: true,
        margin: theme.spacing.unit,
        minWidth: 270,
        maxWidth: 400,

    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 270,
        maxWidth: 400,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit,
    },
});

class SimpleSelect extends React.Component {
    state = {
        topic: '',
    };


    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {classes} = this.props;

        return (
            <form className={classes.root} autoComplete="off" action="{% url 'send_mail' %}" method="POST">
                <Grid container direction="column" alignItems="center" justify="center" spacing={0}>
                    <Paper>
                        <Grid item>
                            <FormControl className={classes.formControl} direction="column">

                                <InputLabel>W jakiej sprawie się kontaktujesz?</InputLabel>
                                <Select
                                    name="topic"
                                    value={this.state.topic}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'topic',
                                        id: 'topic-simple',
                                    }}
                                >
                                    <MenuItem value={1}>Zgłaszam błąd na stronie</MenuItem>
                                    <MenuItem value={2}>Potrzebuję pomocy</MenuItem>
                                    <MenuItem value={3}>Propozycja współpracy</MenuItem>
                                    <MenuItem value={4}>Inne</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    name="firstName"
                                    required
                                    id="firstName"
                                    label="Imię"
                                    type="text"
                                />
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    name="secondName"
                                    id="secondName"
                                    label="Nazwisko"
                                    type="text"
                                />
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    name="email"
                                    required
                                    id="email"
                                    label="Email"
                                    type="email"
                                />
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    name="content"
                                    required
                                    id="message"
                                    label="Wiadomość"
                                    type="text"
                                    multiline
                                    rows="4"
                                />
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <Button type="submit" variant="raised" color="primary" className={classes.button}>
                                Wyślij
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </form>

        );
    }
}

SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);
