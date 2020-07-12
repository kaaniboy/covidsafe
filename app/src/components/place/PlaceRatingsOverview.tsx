import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { Place } from '../../services/PlaceService';
import { PlaceRating, RatingCategory } from '../../services/RatingService';

type Props = {
  place: Place,
  rating: PlaceRating
};

const RATING_CATEGORIES = [
  { name: 'employeeMasks', label: 'Employee Masks' },
  { name: 'customerMasks', label: 'Customer Masks' },
  { name: 'distancing', label: 'Social Distancing' }
] as { name: RatingCategory, label: string }[];

const CATEGORY_MISSING_TEXT = 'There are no reviews for this category yet.';

export default function PlaceRatingsOverview({ place, rating }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<RatingCategory>('employeeMasks');

  const buttons = RATING_CATEGORIES.map((category, i) => (
    <Button
      size='small'
      style={styles.categoryButton}
      appearance={category.name === selectedCategory ? 'filled' : 'outline'}
      key={i}
      onPress={() => setSelectedCategory(category.name)}
    >
      {category.label}
    </Button>
  ));

  const selectedCategoryMissing =
    !rating.categories[selectedCategory];

  return (
    <View style={styles.container}>
      <View style={[styles.childContainer, styles.left]}>
        {buttons}
      </View>
      <View style={[styles.childContainer, styles.right]}>
        <Text category='h1'>
          {(rating.categories[selectedCategory] || '?') + ' / 5'}
        </Text>
        <Text style={styles.description}>
          {selectedCategoryMissing
            ? CATEGORY_MISSING_TEXT
            : 'This is a test description beneath the score.'
          }
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