import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import consts from './consts.js';
import List, {
    ListItem,
    ListItemAvatar,
    ListItemText
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import deepOrange from 'material-ui/colors/deepOrange';
import deepPurple from 'material-ui/colors/deepPurple';
import green from 'material-ui/colors/green';
import blue from 'material-ui/colors/blue';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    contentText: {
        height: 140,
        width: 400,
    },
    mainContainer: {
        padding: 20
    },
    gridItem: {
        padding: 20
    },
    orangeAvatar: {
        color: '#fff',
        backgroundColor: deepOrange[500],
    },
    purpleAvatar: {
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
    blueAvatar: {
        color: '#fff',
        backgroundColor: blue[500],
    },
    greenAvatar: {
        color: '#fff',
        backgroundColor: green[500],
    },
});

class Description extends React.Component {

    render() {
        const {classes} = this.props;

        return (
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid container className={classes.mainContainer} justify="center">

                        <Grid key={1} item className={classes.gridItem}>
                            <Typography variant="title">
                                O projekcie
                            </Typography>
                            <p className={classes.contentText}>
                                {consts.frontPageText}
                            </p>
                            <p className={classes.contentText}>
                                Projekt jest realizowany w ramach przedmiotu Inżynieria Oprogramowania,
                                prowadzonym na wydziale MIM UW w roku 2017/2018.
                            </p>
                        </Grid>
                        <Grid key={2} item className={classes.gridItem}>
                            <Typography variant="title" style={{ marginLeft: 24}}>
                                {/*margin because avatars are moved to left*/}
                                Autorzy
                            </Typography>
                            <List dense>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.purpleAvatar}>MB</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Marcin Byra" secondary="developer"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.greenAvatar}>MiO</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Michał Ołtarzewski" secondary="developer"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.blueAvatar}>MaO</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Mateusz Olko" secondary="developer"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar className={classes.orangeAvatar}>AZ</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Antoni Zawodny" secondary="developer"/>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

Description.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Description);

