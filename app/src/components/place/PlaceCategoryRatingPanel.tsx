import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RatingService, { PlaceRating, RatingCategory } from '../../services/RatingService';
import { DiningType } from '../../services/ReviewService';

type Props = {
  rating: PlaceRating,
  category: RatingCategory
};

const DINING_TYPE_LABELS = {
  'dine_in': 'Dine-In',
  'drive_thru': 'Drive-Thru',
  'pick_up': 'Pick-Up'
} as { [key in DiningType]: string };

function renderCheckMark() {
  return (
    <MaterialCommunityIcons
      style={styles.icon}
      name='check'
      size={24}
      color='#00E096' />
  );
}

function renderDiningTypes(rating: PlaceRating) {
  if (!rating.diningTypes) {
    return null;
  }

  return (
    <View>
      <Text style={[styles.diningTypesHeader, styles.center]}>
        This location offers these dining styles:
      </Text>
      {Object.keys(DINING_TYPE_LABELS).map(type => (
        rating.diningTypes![type as DiningType] > 0 && (
          <View style={styles.diningType} key={type}>
            {renderCheckMark()}
            <Text style={styles.center} category='s1'>
              {DINING_TYPE_LABELS[type as DiningType]}
            </Text>
          </View>
        )
      ))}
    </View>
  );
}

export default function PlaceCategoryRatingPanel({ rating, category }: Props) {
  const formattedRating = RatingService.formatCategoryRating(rating, category);
  const categoryMessage = RatingService.getCategoryMessage(rating, category);

  const formattedRatingText = formattedRating && (
    <Text style={styles.center} category='h2'>
      {formattedRating}
    </Text>
  );

  const categoryMessageText = categoryMessage && (
    <Text style={[styles.description, styles.center]}>
      {RatingService.getCategoryMessage(rating, category)}
    </Text>
  );

  return (
    <View style={styles.container}>
      {category === 'diningTypes'
        ? renderDiningTypes(rating)
        : formattedRatingText
      }
      {categoryMessageText}
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
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
  },
  diningType: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  diningTypesHeader: {
    marginBottom: 5
  },
  icon: {
    textAlignVertical: 'bottom'
  }
});