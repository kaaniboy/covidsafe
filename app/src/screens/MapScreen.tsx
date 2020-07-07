import React from 'react';
import * as Location from 'expo-location';
import { StyleSheet } from 'react-native';
import { Layout, Input } from '@ui-kitten/components';
import MapView, { UrlTile, Marker } from 'react-native-maps';
import PlaceService, { Place } from '../services/PlaceService';

const TILESET_URL = 'http://c.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_DELTA = 0.02;

type State = {
  region: {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
  },
  places: Place[]
}

export default class MapScreen extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      region: {
        latitude: 33.4231622,
        longitude: -111.9280878,
        latitudeDelta: MAP_DELTA,
        longitudeDelta: MAP_DELTA,
      },
      places: []
    };
  }

  retrievePlaces = async () => {
    const { latitude, longitude } = this.state.region;

    try {
      const places = await PlaceService.retrievePlaces(
        latitude,
        longitude
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
      return;
    }

    const location = await Location.getCurrentPositionAsync();
    this.setState({
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: MAP_DELTA,
        longitudeDelta: MAP_DELTA
      }
    });
  }

  async componentDidMount() {
    await this.retrieveCurrentLocation();
    await this.retrievePlaces();
  }

  render() {
    const { region, places } = this.state;

    return (
      <Layout style={styles.fill}>
        <MapView
          region={region}
          style={styles.fill}>
          <UrlTile urlTemplate={TILESET_URL} />
          {places.map(p => (
            <Marker
              key={p.id}
              coordinate={{
                latitude: p.location.lat,
                longitude: p.location.lng
              }}
              title={p.name}
            />
          ))}
        </MapView>
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
    position: 'absolute',
    alignSelf: 'center',
    width: '90%',
    top: 70
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