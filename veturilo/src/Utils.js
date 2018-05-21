import axios from 'axios';
import consts from './consts.js';
import converter from 'xml-js';

class Utils {
  static getStations(onSuccess, onError) {
    axios.get(consts.stationsApi, {
      timeout: 4000,
    }).then(res => onSuccess(res.data.stations)).catch(onError);
  }
  static getStationsWithBikesInfo(onSuccess,onError) {
    axios.get(consts.stationsWithBikesApi, {
      timeout: 4000,
    }).then(res => {
        let stations = JSON.parse(
          converter.xml2json(res.data, {compact: true, spaces: 4}))
            .markers.country.city.place;

        onSuccess(stations);
      })
      .catch(onError);
  }
  static getRoute(stationA, stationB, onSuccess, onError) {
    axios.get(consts.routeApi, {
      timeout: 8000,
      params: {
        station_a: stationA,
        station_b: stationB,
      },
    }).then(res => {
      onSuccess(res);
    }).catch(onError);
  }
  static getLocation(onSuccess, onError) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess);
    } else {
      onError();
    }
  }
  static getAddressGps(address, geocoder, onSuccess) {
    geocoder.geocode({
      address: address,
    }, res => {
      if (res.length > 0 && res[0].geometry !== undefined)
        onSuccess(res[0].geometry.location.lat() + "|" + res[0].geometry.location.lng());
    });
  }
  static isMobile() {
    const w = window,
    e = document.documentElement,
    g = document.getElementsByTagName('body')[0];
    const width = w.innerWidth|| e.clientWidth|| g.clientWidth;

    return width < consts.mobileWebsiteWidth;
  }
}

export default Utils;
