import React from 'react';
import * as Location from 'expo-location';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Layout, Input, Spinner } from '@ui-kitten/components';
import PlaceService, { Place } from '../services/PlaceService';
import PlacePanel from '../components/place/PlacePanel';
import SwipeablePanel from 'rn-swipeable-panel';
import { NavigationProp } from '@react-navigation/core';
import { StackParamList } from '../../App';
import PlaceMap from '../components/place/PlaceMap';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  mapRef: PlaceMap | null = null;
  searchRef: Input | null = null;
  location: Location.LocationData | null = null;

  state = {
    places: [],
    selectedPlace: null,
    isLoading: false,
    isPlacePanelActive: false
  };

  async componentDidMount() {
    this.location = await this.retrieveCurrentLocation();
    if (this.location) {
      const { coords } = this.location;
      await this.retrievePlaces(coords.latitude, coords.longitude);
    }
  }

  retrievePlaces = async (lat: number, lng: number, query?: string) => {
    this.setState({ isLoading: true });
    try {
      const places = await PlaceService.retrievePlaces(lat, lng, query);
      this.mapRef!.animateToPlaces(places);
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
    const mapCenter = await this.mapRef!.getMapCenter();
    await this.retrievePlaces(mapCenter.lat, mapCenter.lng, query);
  }

  showPlacePanel = (selectedPlace: Place) => {
    this.setState({
      selectedPlace,
      isPlacePanelActive: true
    });
  }

  renderSearchAccessory = () => {
    const { isLoading } = this.state;
    if (isLoading) {
      return <Spinner />;
    }

    return (
      <TouchableWithoutFeedback
        onPress={() => this.searchRef!.clear()}
      >
        <MaterialCommunityIcons
          name='close'
          size={24}
          color='black'
        />
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { navigation } = this.props;
    const { places, selectedPlace, isPlacePanelActive } = this.state;

    return (
      <Layout style={styles.fill}>
        <PlaceMap
          places={places}
          onMarkerPress={this.showPlacePanel}
          onMapPress={() => this.searchRef!.blur()}
          ref={ref => this.mapRef = ref}
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
          accessoryRight={this.renderSearchAccessory}
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