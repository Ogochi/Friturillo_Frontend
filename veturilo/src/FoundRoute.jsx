import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import LocationIcon from 'material-ui-icons/LocationOn';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {Paper} from "material-ui";

export class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            steps: [],
        };
    }

    renderStation = name => (
        <Grid container alignItems="center" key={name + "point"} wrap="nowrap">
            <LocationIcon style={{marginRight: "1em"}}/>
            <span>{name}</span>
        </Grid>
    )

    renderCaption = text => (
        <Typography variant="caption" align="center" key={text + "text"}>
            {text}
        </Typography>
    )


    render() {
        const style = {
            width: '5em',
            height: '3em'
        }

        const {classes} = this.props;

        let route = [this.renderStation(this.props.route.data[0].name)];
        for (let i = 1; i < this.props.route.data.length; i++) {
            let timeBetween = this.props.route.data[i].ETA - this.props.route.data[i - 1].ETA;
            let distanceBetween = this.props.route.data[i].length - this.props.route.data[i - 1].length;
            route.push(this.renderCaption(`Czas pomiędzy: ${Math.round(timeBetween / 60)} minut`));
            route.push(this.renderCaption(`Odległość pomiędzy: ${Math.round(distanceBetween / 1000)} km`));
            route.push(this.renderStation(this.props.route.data[i].name));
        }

        let time = Math.round(this.props.route.data.pop().ETA / 60);
        return (
            <Grid container>

                 <Grid item>
                    <Grid container direction="row">
                        <Grid item>
                            <Grid
                                container
                                alignItems="center"
                                onClick={this.props.returnToForm}
                                style={{height: "3em", width: "100%", cursor: "pointer"}}
                            >
                                <ChevronLeftIcon style={{marginLeft: "1em"}}/>
                            </Grid>
                            <Divider/>
                            <div style={{margin: "1em"}}>
                                {route}
                            </div>
                            <Divider/>
                            <div style={{margin: "1em"}}>
                                <Grid container justify="center" alignItems="center">
                                    <Grid item>Pełen czas podróży: {time} minut</Grid>
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item>
                            <Grid
                                container
                                alignItems="center"
                                onClick={this.props.returnToForm}
                                style={{height: "3em", width: "100%", cursor: "pointer"}}
                            >
                                <ChevronLeftIcon style={{marginLeft: "1em"}}/>
                            </Grid>
                            <Divider/>
                            <div style={{margin: "1em"}}>
                                {route}
                            </div>
                            <Divider/>
                            <div style={{margin: "1em"}}>
                                <Grid container justify="center" alignItems="center">
                                    <Grid item>Pełen czas podróży: {time} minut</Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item>
                    <div className={style}>
                        <Map google={this.props.google} zoom={14}>

                            <Marker onClick={this.onMarkerClick}
                                    name={'Current location'}/>

                            <InfoWindow onClose={this.onInfoWindowClose}>
                                <div>
                                    <h1>Elo elo 3 2 0</h1>
                                </div>
                            </InfoWindow>
                        </Map>
                    </div>
                </Grid>

            </Grid>
        );
    }
}

export default GoogleApiWrapper({
    // apiKey: (YOUR_GOOGLE_API_KEY_GOES_HERE)
})(MapContainer)