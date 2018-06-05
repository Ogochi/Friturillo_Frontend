
const serverIp = "77.55.218.173";

const consts = {
  stationsApi: `http://${serverIp}:6161/stations`,
  stationsWithBikesApi: `https://api.nextbike.net/maps/nextbike-official.xml?city=210`,
  routeApi: `http://${serverIp}:6161/dijkstra`,
  networkErrorModalTitle: "Błąd połączenia",
  networkErrorModalContent: `Niestety nie udało się połączyć z siecią. Możesz spróbować ponownie lub anulować.`,
  gpsErrorModalTitle: "Błąd Geolokacji",
  gpsErrorModalContent: `Geolokacja nie jest wspierana przez tę przeglądarkę lub nie jest aktualnie dostępna.`,
  frontPageText: `Friturillo jest portalem umożliwiającym wygodne wyznaczenie przy użyciu warszawskiej 
    sieci rowerów Veturillo takiej
    trasy , aby uniknąć opłat nawet za
    długie wycieczki. Serwis za pomocą
    podanych przez użytkownika lub ustalonych na podstawie lokalizacji
    urządzenia miejsca startowego i docelowego wyznacza optymalną trasę wyświetlając następnie odpowiednie
    detale oraz poglądową mapę.`,
  mobileWebsiteWidth: 600,
};

export default consts;
