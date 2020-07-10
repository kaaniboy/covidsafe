import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { Place } from '../services/PlaceService';

type Props = {
  place: Place
};

const CATEGORIES = ['Employee Masks', 'Contactless Pickup', 'Social Distancing'];

export default function PlaceOverview({ place }: Props) {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const buttons = CATEGORIES.map((category, i) => (
    <Button
      style={styles.categoryButton}
      appearance={selectedCategory === i ? 'filled' : 'outline'}
      size='small'
      onPress={() => setSelectedCategory(i)}
    >
      {category}
    </Button>
  ));

  return (
    <View style={styles.container}>
      <View style={[styles.childContainer, styles.left]}>
        {buttons}
      </View>
      <View style={[styles.childContainer, styles.right]}>
        <Text category='h1'>10/10</Text>
        <Text style={styles.description}>
          This is a test description beneath the score.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  childContainer: {
    flex: 1,
    padding: 5
  },
  left: {},
  categoryButton: {
    marginVertical: 5
  },
  right: {
    marginVertical: 10,
    borderColor: '#E8E8E8',
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center'
  },
  description: {
    marginTop: 5,
    textAlign: 'center'
  }
});