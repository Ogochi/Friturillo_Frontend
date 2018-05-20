
const serverIp = "77.55.218.173";

const consts = {
  stationsApi: `http://${serverIp}:6161/stations`,
  stationsWithBikesApi: `https://api.nextbike.net/maps/nextbike-official.xml?city=210`,
  routeApi: `http://${serverIp}:6161/dijkstra`,
  networkErrorModalTitle: "Network Connection Error",
  networkErrorModalContent: `Unfortunately occured network connection error.
    You can either retry to make a connection or cancel.`,
  gpsErrorModalTitle: "GPS Error",
  gpsErrorModalContent: `Geolocations is either not supported by this browser or
    is currently not available.`,
  frontPageText: `Friturillo jest portalem umożliwiającym wygodne wyznaczenie takiej
    trasy przy użyciu sieci rowerów Veturillo, aby uniknąć opłat nawet za
    długie wycieczki. Serwis umożliwia wyznaczenie trasy na podstawie
    podanych przez użytkownika, wyznaczonych na podstawie lokalizacji
    urządzenia lub wskazanych na mapie miejsc startowych i docelowych.`,
  mobileWebsiteWidth: 600,
};

export default consts;
