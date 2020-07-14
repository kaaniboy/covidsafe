import React from 'react';
import * as Location from 'expo-location';
import { StyleSheet } from 'react-native';
import { Layout, Input, Spinner } from '@ui-kitten/components';
import MapView from 'react-native-maps';
import PlaceService, { Place } from '../services/PlaceService';
import PlacePanel from '../components/place/PlacePanel';
import SwipeablePanel from 'rn-swipeable-panel';
import { NavigationProp } from '@react-navigation/core';
import { StackParamList } from '../../App';
import PlaceMap, { MAP_DELTA } from '../components/place/PlaceMap';

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

  render() {
    const { navigation } = this.props;
    const { places, selectedPlace, isLoading, isPlacePanelActive } = this.state;

    return (
      <Layout style={styles.fill}>
        <PlaceMap
          places={places}
          onMarkerPress={this.showPlacePanel}
          onMapPress={() => this.searchRef!.blur()}
          mapRef={r => this.mapRef = r}
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

        <Input style={[styles.search, styles.shadow]}
          placeholder='Search nearby places...'
          returnKeyType='search'
          accessoryRight={() => isLoading ? <Spinner /> : <></>}
          onSubmitEditing={event => this.search(event.nativeEvent.text)}
          ref={ref => this.searchRef = ref}
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
  }
});