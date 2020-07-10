import React from 'react';
import * as Location from 'expo-location';
import { StyleSheet } from 'react-native';
import { Layout, Input, Text } from '@ui-kitten/components';
import MapView, { UrlTile, Marker, Callout } from 'react-native-maps';
import PlaceService, { Place } from '../services/PlaceService';
import PlacePanel from '../components/PlacePanel';
import SwipeablePanel from 'rn-swipeable-panel';
import { NavigationProp } from '@react-navigation/core';
import { StackParamList } from '../../App';

const TILESET_URL = 'http://c.tile.openstreetmap.org/{z}/{x}/{y}.png';

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
  isPlacePanelActive: boolean
}

export default class MapScreen extends React.Component<Props, State> {
  map: MapView | null = null;

  constructor(props: any) {
    super(props);

    this.state = {
      places: [],
      selectedPlace: null,
      isPlacePanelActive: false
    };
  }

  retrievePlaces = async (location: Location.LocationData) => {
    try {
      const places = await PlaceService.retrievePlaces(
        location.coords.latitude,
        location.coords.longitude
      );
      this.setState({ places });
    } catch (error) {
      console.log(error);
      this.setState({ places: [] });
    }
  }

  retrieveCurrentLocation = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      return null;
    }
    return await Location.getCurrentPositionAsync();
  }

  showPlacePanel = (selectedPlace: Place) => {
    this.setState({
      selectedPlace,
      isPlacePanelActive: true
    });
  }

  async componentDidMount() {
    const location = await this.retrieveCurrentLocation();
    if (location) {
      await this.retrievePlaces(location);
      this.map!.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: MAP_DELTA,
        longitudeDelta: MAP_DELTA
      });
    }
  }

  renderMarkers(places: Place[]) {
    return places.map(p => (
      <Marker
        key={p.id}
        coordinate={{
          latitude: p.location.lat,
          longitude: p.location.lng
        }}
        title={p.name}
        onPress={() => this.showPlacePanel(p)}
      >
        <Callout tooltip={true} />
      </Marker>
    ));
  }

  render() {
    const { navigation } = this.props;
    const { places, selectedPlace, isPlacePanelActive } = this.state;

    return (
      <Layout style={styles.fill}>
        <MapView
          style={styles.fill}
          initialRegion={INITIAL_REGION}
          showsCompass={false}
          ref={map => { this.map = map }}
        >
          <UrlTile urlTemplate={TILESET_URL} />
          {this.renderMarkers(places)}
        </MapView>
        <Input style={[styles.search, styles.shadow]}
          placeholder="Search places..."
        />
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
    top: 60
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
  }
});