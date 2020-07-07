import React from 'react';
import * as Location from 'expo-location';
import { StyleSheet } from 'react-native';
import { Layout, Input } from '@ui-kitten/components';
import MapView, { UrlTile } from 'react-native-maps';

const TILESET_URL = 'http://c.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_DELTA = 0.02;

type State = {
  region: {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
  }
}

export default class MapScreen extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: MAP_DELTA,
        longitudeDelta: MAP_DELTA,
      }
    };
  }

  async componentDidMount() {
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

  render() {
    const { region } = this.state;

    return (
      <Layout style={styles.fill}>
        <MapView
          region={region}
          style={styles.fill}>
          <UrlTile urlTemplate={TILESET_URL} />
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