import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import FolderIcon from 'material-ui-icons/Folder';
import DeleteIcon from 'material-ui-icons/Delete';
import deepOrange from 'material-ui/colors/deepOrange';
import deepPurple from 'material-ui/colors/deepPurple';
import green from 'material-ui/colors/green';
import blue from 'material-ui/colors/blue';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    // margin: '${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px',
    margin: "1em",
  },
  p: {
  	margin: "${theme.spacing.unit}px",
  },
  container: {
  	margin: 'theme.spacing.unit',
  },
  lista: {
  	margin: '${theme.spacing.unit}px 0',
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
  blueAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: blue[500],
  },
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
  },
});

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

class InteractiveList extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={16} md={6}>
            <Typography variant="title" className={classes.title}>
              O projekcie
            </Typography>
            <p align='justify' style={{ margin: '2em' }}>
            Friturillo jest portalem umożliwiającym wygodne wyznaczenie takiej 
            trasy przy użyciu sieci rowerów Veturillo, aby uniknąć opłat nawet za 
            długie wycieczki. Serwis umożliwia wyznaczenie trasy na podstawie 
            podanych przez użytkownika, wyznaczonych na podstawie lokalizacji 
            urządzenia lub wskazanych na mapie miejsc startowych i docelowych.
            </p>
            <p align='justify' style={{ margin: '2em' }}>
            Projekt jest realizowany w ramach przedmiotu Inżynieria Oprogramowania,
            prowadzonym na wydziale MIM UW w roku 2017/2018.
            </p>

          </Grid>
          <Grid item xs={16} md={6}>
            <Typography variant="title" className={classes.title}>
              Autorzy
            </Typography>
            <div className={classes.demo}>
              <List className="lista" dense style={{ margin: '0' }} >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.purpleAvatar}>MB</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Marcin Byra"
                      secondary='Front-end'
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.greenAvatar}>MaO</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Michał Ołtarzewski"
                      secondary='Front-end'
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.blueAvatar}>MiO</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Mateusz Olko"
                      secondary='Back-end'
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
						<Avatar className={classes.orangeAvatar}>AZ</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Antoni Zawodny"
                      secondary='Back-end'
                    />
                  </ListItem>                  
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

InteractiveList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InteractiveList);
