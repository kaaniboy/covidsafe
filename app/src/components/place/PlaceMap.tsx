import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import PlaceService, { Place } from '../../services/PlaceService';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MAP_STYLE = [
  {
    'featureType': 'poi',
    'elementType': 'labels.icon',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  }
];

const MARKER_HIGH = require('../../../assets/markerHigh.png');
const MARKER_MEDIUM = require('../../../assets/markerMedium.png');
const MARKER_LOW = require('../../../assets/markerLow.png');
const MARKER = require('../../../assets/marker.png');

const MARKER_ICON_SIZE = { ios: 20, android: 16 };
const MARKER_OFFSET = { x: 0, y: -30 };
const ANCHOR = { x: 0.5, y: 0.8 }

const MAP_DELTA = 0.05;

const INITIAL_REGION = {
  latitude: 33.4231622,
  longitude: -111.9280878,
  latitudeDelta: MAP_DELTA,
  longitudeDelta: MAP_DELTA,
};

type Props = {
  places: Place[],
  onMarkerPress: (place: Place) => void,
  onMapPress: () => void
}

export default class PlaceMap extends React.Component<Props, {}> {
  mapRef: MapView | null = null;

  getMapCenter = async () => {
    const mapBounds = await this.mapRef!.getMapBoundaries();
    const latitude = (mapBounds.northEast.latitude + mapBounds.southWest.latitude) / 2;
    const longitude = (mapBounds.northEast.longitude + mapBounds.southWest.longitude) / 2;

    return { latitude, longitude };
  }

  animateToPlaces = (places: Place[]) => {
    if (places.length === 0) {
      return;
    }

    const placeLats = places.map(p => p.location.lat);
    const placeLngs = places.map(p => p.location.lng);

    const centerLat = (Math.max(...placeLats) + Math.min(...placeLats)) / 2;
    const centerLng = (Math.max(...placeLngs) + Math.min(...placeLngs)) / 2;

    const latRange = Math.max(...placeLats) - Math.min(...placeLats);
    const lngRange = Math.max(...placeLngs) - Math.min(...placeLngs);

    this.mapRef!.animateToRegion({
      latitude: centerLat,
      longitude: centerLng,
      latitudeDelta: latRange + MAP_DELTA,
      longitudeDelta: lngRange + MAP_DELTA
    });
  }

  render() {
    const { places, onMarkerPress, onMapPress } = this.props;

    const markers = places.map((p, i) => (
      <Marker
        key={p.id}
        coordinate={{
          latitude: p.location.lat,
          longitude: p.location.lng
        }}
        zIndex={i}
        title={p.name}
        image={[MARKER_HIGH, MARKER_MEDIUM, MARKER_LOW][Math.floor(Math.random() * 3)]}
        centerOffset={MARKER_OFFSET}
        anchor={ANCHOR}
        onPress={() => onMarkerPress(p)}
      >
        <MaterialCommunityIcons
          style={styles.markerIcon}
          name={PlaceService.getCategoryIcon(p)}
          size={Platform.select(MARKER_ICON_SIZE)}
          color='white'
        />
        <Callout tooltip />
      </Marker>
    ));

    return (
      <MapView
        style={styles.fill}
        customMapStyle={MAP_STYLE}
        initialRegion={INITIAL_REGION}
        ref={ref => this.mapRef = ref}
        showsCompass={false}
        rotateEnabled={false}
        showsPointsOfInterest={false}
        showsMyLocationButton={false}
        toolbarEnabled={false}
        showsUserLocation
        onPress={onMapPress}
      >
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
        top: 5,
        left: 5
      },
      android: {
        top: 1,
        left: 2
      },
      default: {
        top: 5,
        left: 5
      }
    })
  }
});