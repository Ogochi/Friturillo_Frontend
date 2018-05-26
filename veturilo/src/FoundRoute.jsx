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


    renderMarker = (latitude, longitude) => (
        <Marker pos={"lat:" + latitude + "," + "lng:" + longitude}>
        </Marker>
    )

    renderChildren() {
        const {children} = this.props;

        if (!children) return;

        return React.Children.map(children, c => {
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        })
    }


    // points = [
    //     {
    //         latitude: 52.24,
    //         longitude: 21.015
    //     },
    //     {
    //         latitude: 52.233,
    //         longitude: 21.024
    //     },
    //     {
    //         latitude: 52.258,
    //         longitude: 21.028
    //     },
    //     {
    //         latitude: 52.26,
    //         longitude: 21.03
    //     },
    // ]


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

        let pointsBounds = [];
        pointsBounds.push({
            'lat': parseFloat(minLatitude),
            'lng': parseFloat(minLongitude),
        });
        pointsBounds.push({
            'lat': parseFloat(minLatitude),
            'lng': parseFloat(maxLongitude),
        });
        pointsBounds.push({
            'lat': parseFloat(maxLatitude),
            'lng': parseFloat(maxLongitude),
        });

        pointsBounds.push({
            'lat': parseFloat(maxLatitude),
            'lng': parseFloat(minLongitude),
        });

        let bounds = new this.props.google.maps.LatLngBounds();
        for (let i = 0; i < pointsBounds.length; i++) {
            bounds.extend(pointsBounds[i]);
        }

        //TODO parseFloat earlier

        // we have coordinates of "box" - minimal fragment of the map containing all stations
        // now lets make it a little bigger to pass it as the starting fragment of rendered map
        //TODO: above for future, because in this module google-maps-react, the bounds property doesn't work, so I only center the map according to min and max coordinates
        let latitudeDifference = Math.abs(maxLatitude - minLatitude);
        let longitudeDifference = Math.abs(maxLongitude - minLongitude);

        latitudeDifference = parseFloat(latitudeDifference);
        longitudeDifference = parseFloat(longitudeDifference);

        let zoom = latitudeDifference < 0.04 ? 13 : 12;
        console.log("latitudeDifference:", latitudeDifference);
        console.log("zoom:", zoom);

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
                            <div>
                                <Map
                                    style={{height: '70vh', width: '30vw'}}
                                    google={this.props.google}
                                    initialCenter={{
                                        lat: latitudeCenter,
                                        lng: longitudeCenter
                                    }}
                                    // bounds={bounds} // doesn't work :(
                                    zoom={zoom}
                                >
                                    {points.map(point => (
                                        <Marker
                                            title={point.name}
                                            name={point.name}
                                            position={{lat: point.latitude, lng: point.longitude}}>
                                            >
                                        </Marker>
                                    ))}
                                </Map>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>


            </Grid>
        );
    }
}


// export class Container extends React.Component {
//     render() {
//         const style = {
//             width: '30vw',
//             height: '70vh'
//         }
//
//         return (
{
    /*<Map*/
}
{/*style={{height: '70vh', width: '30vw'}}*/
}
{/*google={this.props.google}*/
}
{/*initialCenter={{*/
}
{/*lat: 52.23,*/
}
{/*lng: 21.01*/
}
{/*}}*/
}
{/*zoom={12}*/
}
{/*>*/
}
{/*</Map>*/
}
//         );
//     }
// }

// export default GoogleApiWrapper({
//     // apiKey: {AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo}
// })(Container)

export default GoogleApiWrapper({
    // apiKey: (YOUR_GOOGLE_API_KEY_GOES_HERE)
})(MapContainer)