import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import PlaceService, { Place } from '../services/PlaceService';
import PlacePanel from '../components/place/PlacePanel';
import Search from '../components/map/Search';
import 'leaflet/dist/leaflet.css';
import '../styles/MapPage.scss';

const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_LAYER_ATTRIBUTION = '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

const FOOD_MARKER_ICON = L.icon({
  iconUrl: 'markers/foodMarker.png',
  iconSize: [30, 65],
});

const RETAIL_MARKER_ICON = L.icon({
  iconUrl: 'markers/retailMarker.png',
  iconSize: [30, 65],
});

type State = {
  position: { lat: number, lng: number },
  zoom: number,
  search: string,
  places: Place[],
  selectedPlace: Place | null,
  isLoading: boolean,
  isPlacePanelActive: boolean,
};

export default class MapPage extends React.Component<{}, State> {
  mapRef: Map | null = null;

  constructor(props: any) {
    super(props);

    this.state = {
      position: { lat: 33.4255, lng: -111.9400 },
      zoom: 15,
      search: '',
      places: [],
      selectedPlace: null,
      isLoading: true,
      isPlacePanelActive: false
    };
  }

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords;

      this.setState({
        position: {
          lat: latitude,
          lng: longitude
        }
      });
      await this.search();
    }, async error => {
      const { lat, lng } = this.state.position;
      await this.retrievePlaces(lat, lng);
    });
  }

  retrievePlaces = async (lat: number, lng: number, query?: string) => {
    this.setState({ isLoading: true });

    try {
      const places = await PlaceService.retrievePlaces(lat, lng, query);
      this.setState({ places, isLoading: false });
      return places;
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
      return [];
    }
  }

  search = async (query?: string) => {
    const mapCenter = this.mapRef!.viewport.center!;
    const places = await this.retrievePlaces(mapCenter[0], mapCenter[1], query);

    if (places.length === 0) {
      return;
    }

    const placeLats = places.map(p => p.location.lat);
    const placeLngs = places.map(p => p.location.lng);
    const southWest = { lat: Math.min(...placeLats), lng: Math.min(...placeLngs) };
    const northEast = { lat: Math.max(...placeLats), lng: Math.max(...placeLngs) };

    this.mapRef!.leafletElement.fitBounds(new L.LatLngBounds(
      southWest,
      northEast
    ));
  }

  selectPlace = (place: Place) => {
    this.setState({
      selectedPlace: place,
      isPlacePanelActive: true
    });
  };

  render() {
    const {
      position,
      zoom,
      search,
      places,
      selectedPlace,
      isPlacePanelActive,
      isLoading
    } = this.state;

    return (
      <>
        <Map
          center={position}
          zoom={zoom}
          id='map'
          ref={ref => this.mapRef = ref}
          zoomControl={false}
          onClick={() => this.setState({ isPlacePanelActive: false })}
        >
          <TileLayer
            attribution={TILE_LAYER_ATTRIBUTION}
            url={TILE_LAYER_URL}
          />
          {places.map(p => (
            <Marker
              position={[p.location.lat, p.location.lng]}
              icon={p.category === 'Food' ? FOOD_MARKER_ICON : RETAIL_MARKER_ICON}
              key={p.id}
              onClick={() => this.selectPlace(p)}
            />
          ))}
        </Map>
        {selectedPlace &&
          <PlacePanel
            place={selectedPlace!}
            isActive={isPlacePanelActive}
          />
        }
        <Search
          value={search}
          isLoading={isLoading}
          onChange={(search) => this.setState({ search })}
          onEnter={query => this.search(query)}
          onClear={() => this.setState({ search: '' })}
        />
      </>
    )
  }
}