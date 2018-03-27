import converter from 'xml-js';
import axios from 'axios';
import consts from './consts.js';

class Utils {
  static getStations(onSuccess, onError) {
    axios.get(consts.veturiloApi, {
      timeout: 3000,
    })
      .then(res => {
        let stations = JSON.parse(
          converter.xml2json(res.data, {compact: true, spaces: 4}))
            .markers.country.city.place;
            
        onSuccess(stations);
      })
      .catch(() => {
        onError();
      })
  }
}

export default Utils;