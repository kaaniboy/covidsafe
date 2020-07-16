import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { Review } from '../../services/ReviewService';
import moment from 'moment';

const MAX_REVIEW_LINES = 10;

type Props = {
  review: Review
};

export default function PlaceReviewsList({ review }: Props) {
  const elapsed = moment.utc(review.createdAt!)
    .fromNow().toUpperCase();

  return (
    <View style={styles.container} key={review.id}>
      <Text style={[styles.header, styles.center]} category='s2'>
        {elapsed}
      </Text>
      <Text style={styles.center} numberOfLines={MAX_REVIEW_LINES}>
        "{review.content as string}"
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    paddingVertical: 5,
    paddingHorizontal: 20,
    minHeight: 30,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#E8E8E8',
  },
  header: {
    marginBottom: 5
  },
  center: {
    textAlign: 'center'
  }
});