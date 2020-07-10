import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { Place } from '../services/PlaceService';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  place: Place
};

export default function PlaceHeader({ place }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text category='h5'>
          {place.name}
        </Text>
        <Text>{place.location.address}</Text>
      </View>
      <View style={styles.icon}>
        <MaterialCommunityIcons name='food' size={48} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 10
  },
  details: {
    flex: 4
  },
  icon: {
    flex: 1,
    alignItems: 'center'
  }
});