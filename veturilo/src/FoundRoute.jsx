/*global google*/

import React from "react"
import {compose, withProps, lifecycle} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer} from "react-google-maps"
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import LocationIcon from 'material-ui-icons/LocationOn';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import {Paper} from "material-ui";
import MediaQuery from 'react-responsive';

class MapWithRoute extends React.PureComponent {
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
    );

    renderCaption = text => (
        <Typography variant="caption" align="center" key={text + "text"}>
            {text}
        </Typography>
    );

    render() {

        let points = [];
        // misnamed longitude and latitude in backend!!! 2 hours of debugging :(
        let minLatitude = this.props.route.data[0].longitude, maxLatitude = this.props.route.data[0].longitude,
            minLongitude = this.props.route.data[0].latitude, maxLongitude = this.props.route.data[0].latitude;

        for (let i = 0; i < this.props.route.data.length; i++) {
            // misnamed longitude and latitude in backend!!! 2 hours of debugging :(
            points.push({
                'latitude': this.props.route.data[i].longitude,
                'longitude': this.props.route.data[i].latitude,
                'name': this.props.route.data[i].name,
            });

            minLatitude = points[i].latitude < minLatitude ? points[i].latitude : minLatitude;
            maxLatitude = points[i].latitude > maxLatitude ? points[i].latitude : maxLatitude;
            minLongitude = points[i].longitude < minLongitude ? points[i].longitude : minLongitude;
            maxLongitude = points[i].longitude > maxLongitude ? points[i].longitude : maxLongitude;
        }


        // we have coordinates of "box" - minimal fragment of the map containing all stations
        // now lets make it a little bigger to pass it as the starting fragment of rendered map
        let latitudeDifference = Math.abs(maxLatitude - minLatitude);
        let longitudeDifference = Math.abs(maxLongitude - minLongitude);

        latitudeDifference = parseFloat(latitudeDifference);
        longitudeDifference = parseFloat(longitudeDifference);

        minLatitude -= 0.2 * latitudeDifference;
        maxLatitude += 0.2 * latitudeDifference;
        minLongitude -= 0.2 * longitudeDifference;
        maxLongitude += 0.2 * longitudeDifference;

        minLatitude = parseFloat(minLatitude);
        maxLatitude = parseFloat(maxLatitude);
        minLongitude = parseFloat(minLongitude);
        maxLongitude = parseFloat(maxLongitude);

        let latitudeCenter = minLatitude + Math.abs(maxLatitude - minLatitude) / 2;
        let longitudeCenter = minLongitude + Math.abs(maxLongitude - minLongitude) / 2;

        let route = [this.renderStation(this.props.route.data[0].name)];
        for (let i = 1; i < this.props.route.data.length; i++) {
            let timeBetween = this.props.route.data[i].ETA - this.props.route.data[i - 1].ETA;
            let distanceBetween = this.props.route.data[i].length - this.props.route.data[i - 1].length;
            route.push(this.renderCaption(`Czas pomiędzy: ${Math.round(timeBetween / 60)} minut`));
            route.push(this.renderCaption(`Odległość pomiędzy: ${Math.round(distanceBetween / 1000)} km`));
            route.push(this.renderStation(this.props.route.data[i].name));
        }

        let time = Math.round(this.props.route.data.pop().ETA / 60);


        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(new window.google.maps.LatLng(minLatitude, minLongitude));
        bounds.extend(new window.google.maps.LatLng(minLatitude, maxLongitude));
        bounds.extend(new window.google.maps.LatLng(maxLatitude, minLongitude));
        bounds.extend(new window.google.maps.LatLng(maxLatitude, maxLongitude));

        const MapWithADirectionsRenderer = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
                loadingElement: <div style={{height: `100%`}}/>,
                containerElement: <div style={{height: `100%`}}/>,
                mapElement: <div style={{zIndex: '1', height: `100%`}}/>,
            }),
            withScriptjs,
            withGoogleMap,
            lifecycle({
                componentDidMount() {
                    const DirectionsService = new google.maps.DirectionsService();

                    let myWaypoints = [];
                    for (let i = 1; i < points.length - 1; i++) {
                        myWaypoints.push({location: new google.maps.LatLng(points[i].latitude, points[i].longitude)})
                    }

                    DirectionsService.route({
                        // origin: new google.maps.LatLng(points[0].latitude, points[0].longitude),
                        origin: new google.maps.LatLng(points[0].latitude, points[0].longitude),
                        destination: new google.maps.LatLng(points[points.length - 1].latitude, points[points.length - 1].longitude),
                        travelMode: google.maps.TravelMode.BICYCLING,
                        waypoints: myWaypoints
                    }, (result, status) => {
                        if (status === google.maps.DirectionsStatus.OK) {
                            this.setState({
                                directions: result,
                            });
                        } else {
                            console.error(`error fetching directions ${result}`);
                        }
                    });
                },
            })
        )(props =>
            <GoogleMap
                defaultZoom={13}
                defaultCenter={new google.maps.LatLng(latitudeCenter, longitudeCenter)}
            >
                {props.directions && <DirectionsRenderer directions={props.directions}/>}
            </GoogleMap>
        );


        return (
            <div style={{position: 'absolute', width: '100%', height: '100%'}}>

                <MediaQuery key="small" maxWidth={600}>
                    <Paper style={{
                        zIndex: '2',
                        position: 'absolute',
                        width: '90%',
                        top: '3.5em',
                        left: '0',
                        right: '0',
                        margin: '0 auto'
                    }}>
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
                    </Paper>

                </MediaQuery>

                <MediaQuery key="big" minWidth={600}>
                    <Paper style={{
                        zIndex: '2',
                        position: 'absolute',
                        width: '300px',
                        top: '3.5em',
                        left: '2em',
                        right: '2em'
                    }}>
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
                    </Paper>

                </MediaQuery>

                <MapWithADirectionsRenderer ref={map => map && map.fitBounds(bounds)}
                />
            </div>
        )

    }
}

export default MapWithRoute;