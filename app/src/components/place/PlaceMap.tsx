import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import MapView, { UrlTile, Marker, Callout } from 'react-native-maps';
import PlaceService, { Place } from '../../services/PlaceService';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TILESET_URL = 'http://c.tile.openstreetmap.org/{z}/{x}/{y}.png';

const MARKER_HIGH = require('../../../assets/markerHigh.png');
const MARKER_MEDIUM = require('../../../assets/markerMedium.png');
const MARKER_LOW = require('../../../assets/markerLow.png');

const MARKER_OFFSET = { x: 0, y: -30 };
const ANCHOR = { x: 0.5, y: 0.8 }

export const MAP_DELTA = 0.02;
const INITIAL_REGION = {
  latitude: 33.4231622,
  longitude: -111.9280878,
  latitudeDelta: MAP_DELTA,
  longitudeDelta: MAP_DELTA,
};

type Props = {
  places: Place[],
  mapRef: (ref: MapView | null) => void,
  onMarkerPress: (place: Place) => void,
  onMapPress: () => void
}

export default class PlaceMap extends React.Component<Props, {}> {
  render() {
    const { places, mapRef, onMarkerPress, onMapPress } = this.props;

    const markers = places.map((p, i) => (
      <Marker
        key={p.id}
        coordinate={{
          latitude: p.location.lat,
          longitude: p.location.lng
        }}
        zIndex={i}
        title={p.name}
        image={MARKER_HIGH || MARKER_LOW}
        centerOffset={MARKER_OFFSET}
        anchor={ANCHOR}
        onPress={() => onMarkerPress(p)}
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

    return (
      <MapView
        style={styles.fill}
        initialRegion={INITIAL_REGION}
        ref={mapRef}
        showsCompass={false}
        rotateEnabled={false}
        showsPointsOfInterest={false}
        showsUserLocation
        onPress={onMapPress}
      >
        <UrlTile urlTemplate={TILESET_URL} />
        {markers}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
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