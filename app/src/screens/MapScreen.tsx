import React from 'react';
import * as Location from 'expo-location';
import { Platform, StyleSheet } from 'react-native';
import { Layout, Input, Spinner } from '@ui-kitten/components';
import MapView, { UrlTile, Marker, Callout } from 'react-native-maps';
import PlaceService, { Place } from '../services/PlaceService';
import PlacePanel from '../components/place/PlacePanel';
import SwipeablePanel from 'rn-swipeable-panel';
import { NavigationProp } from '@react-navigation/core';
import { StackParamList } from '../../App';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TILESET_URL = 'http://c.tile.openstreetmap.org/{z}/{x}/{y}.png';

const MARKER_HIGH = require('../../assets/markerHigh.png');
const MARKER_MEDIUM = require('../../assets/markerMedium.png');
const MARKER_LOW = require('../../assets/markerLow.png');
const MARKER_OFFSET = { x: 0, y: -30 };
const ANCHOR = {x: 0.5, y: 0.8 }

const MAP_DELTA = 0.02;
const INITIAL_REGION = {
  latitude: 33.4231622,
  longitude: -111.9280878,
  latitudeDelta: MAP_DELTA,
  longitudeDelta: MAP_DELTA,
};

type Props = {
  navigation: NavigationProp<StackParamList>
};

type State = {
  places: Place[],
  selectedPlace: Place | null,
  isLoading: boolean,
  isPlacePanelActive: boolean
}

export default class MapScreen extends React.Component<Props, State> {
  mapRef: MapView | null = null;
  searchRef: Input | null = null;
  location: Location.LocationData | null = null;

  state = {
    places: [],
    selectedPlace: null,
    isLoading: false,
    isPlacePanelActive: false
  };

  retrievePlaces = async (lat: number, lng: number, query?: string) => {
    this.setState({ isLoading: true });
    try {
      const places = await PlaceService.retrievePlaces(lat, lng, query);
      this.setState({ places });
    } catch (error) {
      console.log(error);
      this.setState({ places: [] });
    }
    this.setState({ isLoading: false });
  }

  retrieveCurrentLocation = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      return null;
    }
    return await Location.getCurrentPositionAsync();
  }

  search = async (query: string) => {
    const mapBounds = await this.mapRef!.getMapBoundaries();
    const centerLat = (mapBounds.northEast.latitude + mapBounds.southWest.latitude) / 2;
    const centerLng = (mapBounds.northEast.longitude + mapBounds.southWest.longitude) / 2;

    await this.retrievePlaces(centerLat, centerLng, query);
  }

  showPlacePanel = (selectedPlace: Place) => {
    this.setState({
      selectedPlace,
      isPlacePanelActive: true
    });
  }

  async componentDidMount() {
    this.location = await this.retrieveCurrentLocation();
    if (this.location) {
      const { coords } = this.location;
      await this.retrievePlaces(coords.latitude, coords.longitude);

      this.mapRef!.animateToRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: MAP_DELTA,
        longitudeDelta: MAP_DELTA
      });
    }
  }

  renderMarkers(places: Place[]) {
    return places.map((p, i) => (
      <Marker
        key={p.id}
        coordinate={{
          latitude: p.location.lat,
          longitude: p.location.lng
        }}
        zIndex={i}
        title={p.name}
        image={MARKER_HIGH || MARKER_LOW }
        centerOffset={MARKER_OFFSET}
        anchor={ANCHOR}
        onPress={() => this.showPlacePanel(p)}
      >
        <MaterialCommunityIcons
          style={styles.markerIcon}
          name={PlaceService.getCategoryIcon(p)}
          size={32}
          color='white'
        />
        <Callout tooltip />
      </Marker>
    ));
  }

  render() {
    const { navigation } = this.props;
    const { places, selectedPlace, isLoading, isPlacePanelActive } = this.state;

    return (
      <Layout style={styles.fill}>
        <MapView
          style={styles.fill}
          initialRegion={INITIAL_REGION}
          ref={ref => { this.mapRef = ref }}
          onPress={() => this.searchRef!.blur()}
          showsCompass={false}
          rotateEnabled={false}
          showsPointsOfInterest={false}
          showsUserLocation
        >
          <UrlTile urlTemplate={TILESET_URL} />
          {this.renderMarkers(places)}
        </MapView>

        <SwipeablePanel
          isActive={isPlacePanelActive}
          onClose={() => this.setState({ isPlacePanelActive: false })}
          closeOnTouchOutside
        >
          {selectedPlace && (
            <PlacePanel
              place={selectedPlace}
              navigation={navigation}
            />
          )}
        </SwipeablePanel>
        <Input style={[styles.search, styles.shadow]}
          placeholder='Search nearby places...'
          returnKeyType='search'
          accessoryRight={() => isLoading ? <Spinner/> : <></>}
          onSubmitEditing={event => this.search(event.nativeEvent.text)}
          ref={ref => this.searchRef = ref }
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  search: {
    borderRadius: 25,
    position: 'absolute',
    alignSelf: 'center',
    width: '95%',
    top: 60,
    zIndex: 0
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
    elevation: 5
  },
  markerIcon: {
    flex: 1,
    ...Platform.select({
      ios: {
        top: 8,
        left: 8
      },
      android: {
        top: 0,
        left: 0
      },
      default: {
        top: 8,
        left: 8
      }
    })
  }
});