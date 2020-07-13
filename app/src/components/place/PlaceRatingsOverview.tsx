import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '@ui-kitten/components';
import { Place } from '../../services/PlaceService';
import { PlaceRating, RatingCategory } from '../../services/RatingService';
import PlaceCategoryRatingPanel from './PlaceCategoryRatingPanel';

type Props = {
  place: Place,
  rating: PlaceRating
};

const FOOD_CATEGORIES = [
  { name: 'employeeMasks', label: 'Employee Masks' },
  { name: 'customerMasks', label: 'Customer Masks' },
  { name: 'distancing', label: 'Social Distancing' }
] as { name: RatingCategory, label: string }[];

const RETAIL_CATEGORIES = [
  { name: 'employeeMasks', label: 'Employee Masks' },
  { name: 'customerMasks', label: 'Customer Masks' },
  { name: 'distancing', label: 'Social Distancing' },
  { name: 'dividers', label: 'Plexiglass Dividers' }
] as { name: RatingCategory, label: string }[];

export default function PlaceRatingsOverview({ place, rating }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<RatingCategory>('employeeMasks');

  const categories = place.category === 'Food'
    ? FOOD_CATEGORIES
    : RETAIL_CATEGORIES;

  const buttons = categories.map(category => (
    <Button
      size='tiny'
      style={styles.categoryButton}
      appearance={category.name === selectedCategory ? 'filled' : 'outline'}
      key={category.name}
      onPress={() => setSelectedCategory(category.name)}
    >
      {category.label}
    </Button>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.childContainer}>
        {buttons}
      </View>
      <View style={styles.childContainer}>
        <PlaceCategoryRatingPanel
          rating={rating}
          category={selectedCategory}
        />
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
  }
});