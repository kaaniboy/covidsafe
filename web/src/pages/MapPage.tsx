import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import PlaceService, { Place } from '../services/PlaceService';
import { PlaceRating } from '../services/RatingService';
import PlacePanel from '../components/place/PlacePanel';
import Search from '../components/map/Search';
import WelcomeModal from '../components/modal/WelcomeModal';
import 'leaflet/dist/leaflet.css';
import '../styles/MapPage.scss';
import MarkerService from '../services/MarkerService';

const SHOW_WELCOME_MODAL_ITEM = 'showWelcomeModal';

// http://leaflet-extras.github.io/leaflet-providers/preview/
const TILE_LAYER_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const TILE_LAYER_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors '
  + ' &copy; <a href="https://carto.com/attributions">CARTO</a>';

const DEFAULT_MAP_ZOOM = 15;
const DEFAULT_MAP_COORDS = { lat: 33.4255, lng: -111.9400 };

type State = {
  position: { lat: number, lng: number },
  zoom: number,
  places: Place[],
  selectedPlace: Place | null,
  isLoading: boolean,
  isPlacePanelActive: boolean,
  isWelcomeModalVisible: boolean
};

export default class MapPage extends React.Component<{}, State> {
  mapRef: Map | null = null;

  constructor(props: any) {
    super(props);

    this.state = {
      position: DEFAULT_MAP_COORDS,
      zoom: DEFAULT_MAP_ZOOM,
      places: [],
      selectedPlace: null,
      isLoading: true,
      isPlacePanelActive: false,
      isWelcomeModalVisible: false
    };
  }

  async componentDidMount() {
    this.showWelcomeModal();
    const { lat, lng } = this.state.position;
    await this.search({ lat, lng });
  }

  showWelcomeModal = () => {
    if (localStorage.getItem(SHOW_WELCOME_MODAL_ITEM) !== 'false') {
      this.setState({ isWelcomeModalVisible: true });
    };
  }

  onWelcomeModalClose = (dontShowAgain: boolean) => {
    this.setState({ isWelcomeModalVisible: false });
    if (dontShowAgain) {
      localStorage.setItem(SHOW_WELCOME_MODAL_ITEM, 'false');
    }
  }

  search = async ({ lat, lng, query}: { lat?: number, lng?: number, query?: string }) => {
    this.setState({ isLoading: true });

    lat = lat || this.mapRef!.viewport.center![0];
    lng = lng || this.mapRef!.viewport.center![1];
    let places = [];

    try {
      places = await PlaceService.retrievePlaces(lat, lng, query);
    } catch (error) {
      console.log(error);
      return this.setState({ isLoading: false });
    }

    if (places.length === 0) {
      return this.setState({ isLoading: false });
    }

    const placeLats = places.map(p => p.location.lat);
    const placeLngs = places.map(p => p.location.lng);
    const southWest = { lat: Math.min(...placeLats), lng: Math.min(...placeLngs) };
    const northEast = { lat: Math.max(...placeLats), lng: Math.max(...placeLngs) };

    this.mapRef!.leafletElement.fitBounds(new L.LatLngBounds(
      southWest,
      northEast
    ));
    this.setState({ places, isLoading: false });
  }

  selectPlace = (place: Place) => {
    this.setState({
      selectedPlace: place,
      isPlacePanelActive: true
    });
  };

  onReviewSubmitted = (placeRating: PlaceRating) => {
    const { selectedPlace } = this.state;
    selectedPlace!.rating = placeRating;
    this.setState({ selectedPlace });
  };

  render() {
    const {
      position,
      zoom,
      places,
      selectedPlace,
      isPlacePanelActive,
      isLoading,
      isWelcomeModalVisible
    } = this.state;

    return (
      <>
        <WelcomeModal
          isVisible={isWelcomeModalVisible}
          onClose={this.onWelcomeModalClose}
        />
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
              icon={MarkerService.getMarkerIcon(p)}
              key={p.id}
              onClick={() => this.selectPlace(p)}
            />
          ))}
        </Map>
        {selectedPlace &&
          <PlacePanel
            place={selectedPlace!}
            isActive={isPlacePanelActive}
            onReviewSubmitted={this.onReviewSubmitted}
          />
        }
        <Search
          isLoading={isLoading}
          onEnter={query => this.search({ query })}
          onCitySelected={city => {
            this.search({ lat: city.lat, lng: city.lng });
          }}
        />
      </>
    )
  }
}