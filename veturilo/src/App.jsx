/* global google */
import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import List, {ListItem} from 'material-ui/List';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import Grid from 'material-ui/Grid';
import AutoComplete from './AutoComplete.jsx';
import NetworkErrorModal from './NetworkErrorModal.jsx';
import FoundRoute from './FoundRoute.jsx';
import Utils from './Utils.js';
import consts from './consts.js';

const styles = {
    paper: {
        marginTop: "20%",
        minHeight: "13em",
        minWidth: "19em",
        maxWidth: "80%",
    },
    spinner: {
        marginTop: "20%",
        width: "5em",
        height: "5em",
    },
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start: {value: "", isCorrect: false}, // isCorrect if selected from autocomplete
            startGps: "",
            destination: {value: "", isCorrect: false},
            destGps: "",
            stations: [],
            networkErrorModalOpen: false,
            backendErrorModalOpen: false,
            formState: "form",
            route: {},
            height: 0,
            geocoder: new google.maps.Geocoder(),
        };
    }

    componentDidMount() {
        const barHeight = document.getElementById('appBar').clientHeight;
        const w = window,
            e = document.documentElement,
            g = document.getElementsByTagName('body')[0],
            windowHeight = w.innerHeight || e.clientHeight || g.clientHeight;
        this.setState({
            height: windowHeight - barHeight,
        });

        this.getStations(true)();
    }

    getStations = isItFirstTime => () => {
        if (!isItFirstTime)
            this.toggleModal("networkErrorModal")();
        Utils.getStations(this.onStationsReceived, this.toggleModal("networkErrorModal"));
    }

    toggleModal = modalName => () => {
        this.setState(prevState => ({
            [`${modalName}Open`]: !prevState[`${modalName}Open`],
        }));
    }

    onStationsReceived = stations =>
        this.setState({
            stations: stations,
        })

    onInputChange = inputName => value => {
        if (value.isCorrect) {
            this.parseInput(inputName, value.value);
        }
        this.setState({
            [inputName]: value,
        });
    }

    changeFormState = newState => async () => {
        if (newState === "form") {
            this.setState(prev => ({
                start: {value: prev.start.value, isCorrect: false},
                destination: {value: prev.destination.value, isCorrect: false},
            }));
        }
        this.setState({
            formState: newState,
        });
    }

    onSubmitClicked = () => {
        this.changeFormState("waiting")().then(this.getRoute);
    }

    getRoute = async () => {
        Utils.getRoute(this.state.startGps, this.state.destinationGps, this.onRouteFound, () => {
            this.toggleModal("backendErrorModal")();
            this.changeFormState("form")();
        })
    }

    onRouteFound = route => {
        this.setState({
            route: route,
        });
        this.changeFormState("result")();
    }

    parseInput = (inputName, input) => {
        let isStation = false, station = input;
        this.state.stations.forEach(s => {
            if (s.name === input) {
                isStation = true;
                station = s.lat + "|" + s.lon;
                return;
            }
        });
        if (/\d+\.\d+\|\d+\.\d+/.test(input) || isStation) {
            this.setState({
                [inputName + "Gps"]: station,
            });
            return;
        }

        // We assume input is address
        return Utils.getAddressGps(input, this.state.geocoder, this.setGps(inputName));
    }

    setGps = inputName => gps => this.setState({
        [inputName + "Gps"]: gps,
    })

    render() {
        const {classes} = this.props;
        return (
            <div style={{height: this.state.height, position: 'relative'}}>
                <Grid container direction="row" alignItems="center" justify="center" style={{position: 'absolute'}}>
                    <Grid item>
                        <Paper className={classes.paper}>
                            <Grid container justify="center" alignItems="center">
                                {this.state.formState === "form" &&
                                <List style={{marginTop: 20}}>
                                    <ListItem>
                                        <AutoComplete
                                            placeholder="Początek podróży"
                                            onChange={this.onInputChange('start')}
                                            labels={this.state.stations.map(s => ({name: s.name}))}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <AutoComplete
                                            placeholder="Koniec podróży"
                                            onChange={this.onInputChange('destination')}
                                            labels={this.state.stations.map(s => ({name: s.name}))}
                                        />
                                    </ListItem>
                                    {this.state.start.isCorrect && this.state.destination.isCorrect &&
                                    <ListItem>
                                        <Button
                                            style={{marginLeft: "auto", marginRight: "auto"}}
                                            variant="raised"
                                            color="primary"
                                            onClick={this.onSubmitClicked}
                                        >
                                            Szukaj
                                        </Button>
                                    </ListItem>
                                    }
                                </List>
                                }
                                {this.state.formState === "waiting" &&
                                <Spinner fadeIn="none" className={classes.spinner} color="blue" name="folding-cube"/>
                                }
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                {this.state.formState === "result" &&
                <FoundRoute returnToForm={this.changeFormState("form")} route={this.state.route}
                            height={this.state.height} width={this.state.width}
                            style={{position: 'absolute', top: '0'}}/>
                }
                <NetworkErrorModal
                    onClose={this.toggleModal("networkErrorModal")}
                    onRetry={this.getStations(false)}
                    onCancell={this.toggleModal("networkErrorModal")}
                    open={this.state.networkErrorModalOpen}
                    title={consts.networkErrorModalTitle}
                    content={consts.networkErrorModalContent}
                />
                <NetworkErrorModal
                    onClose={this.toggleModal("backendErrorModal")}
                    onRetry={() => {
                        this.toggleModal("backendErrorModal");
                        this.onSubmitClicked();
                    }}
                    onCancell={this.toggleModal("backendErrorModal")}
                    open={this.state.backendErrorModalOpen}
                    title={consts.networkErrorModalTitle}
                    content={consts.networkErrorModalContent}
                />
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
