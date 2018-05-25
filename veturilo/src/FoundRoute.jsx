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


        const style = {
            width: '5em',
            height: '3em'
        };

        const {classes} = this.props;


        let points = [];

        for (let i = 0; i < this.props.route.data.length; i++) {
            console.log('i', i);
            points.push({
                'latitude': this.props.route.data[i].latitude,
                'longitude': this.props.route.data[i].longitude
            });
        }
        console.log('ELO ELO 3 2 0, oto punkty');
        console.log(points);


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
                                        lat: 52.23,
                                        lng: 21.01
                                    }}
                                    zoom={12}
                                >
                                    {/*<Marker*/}
                                    {/*title={'The marker`s title will appear as a tooltip.'}*/}
                                    {/*name={'SOMA'}*/}
                                    {/*position={{lat: 52.242, lng: 21.063}}/>*/}
                                    {/*<Marker*/}
                                    {/*name={'Dolores park'}*/}
                                    {/*position={{lat: 52.249, lng: 21.07}}/>*/}
                                    {/*<Marker/>*/}
                                    {points.map(point => (
                                            <Marker
                                                title='The marker`s title will appear as a tooltip.'
                                                name='SOMA'
                                                position={'{{'} lat: {point.latitude} lng:  {point.longitude} {'}}'}>
                                                {/*position={{lat: 52.26, lng: 21.06}}*/}
                                            >
                                            </Marker>
                                    ))}
                                    {/*<Marker position={{lat: 52.24, lng: 21.06}}/>*/}
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
{/*<Map*/
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