import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import RatingService, { PlaceRating, RatingCategory } from '../../services/RatingService';

type Props = {
  rating: PlaceRating,
  category: RatingCategory
};

export default function PlaceCategoryRatingPanel({ rating, category }: Props) {
  const categoryRating = !rating.categories[category]
    ? '?' : rating.categories[category]!.toFixed(1);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.center} category='h2'>
          {categoryRating + ' / 5'}
        </Text>
        <Text style={[styles.description, styles.center]}>
          {RatingService.getCategoryMessage(rating, category)}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E8E8E8',
    borderWidth: 2,
    borderRadius: 10,
  },
  description: {
    marginTop: 5
  },
  center: {
    textAlign: 'center'
  }
});