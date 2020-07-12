import React from 'react';
import * as Location from 'expo-location';
import { StyleSheet, View } from 'react-native';
import { Layout, Input, Text } from '@ui-kitten/components';
import MapView, { UrlTile, Marker, Callout } from 'react-native-maps';
import PlaceService, { Place } from '../services/PlaceService';
import PlacePanel from '../components/place/PlacePanel';
import SwipeablePanel from 'rn-swipeable-panel';
import { NavigationProp } from '@react-navigation/core';
import { StackParamList } from '../../App';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
      <Marker style={styles.marker}
      
        key={p.id}
        coordinate={{
          latitude: p.location.lat,
          longitude: p.location.lng
          
        }}
        title={p.name}
        image={require('../../assets/markerHigh.png')}
        centerOffset={{ x: 0, y: -30 }}
        anchor={{ x: 0.5, y: 0.8 }}
        onPress={() => this.showPlacePanel(p)}
      >
        <View style={styles.icon}>
          <MaterialCommunityIcons name='food' size={20} color = 'white'/>
        </View>
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
          placeholder="Search places..."
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
  icon: {
    flex: 1,
    top: 5,
    left: 7,
    position: 'absolute',
    alignItems: 'center'
  },
  marker: {
    flex: 1,
    alignItems: 'center'
  }
});