import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import PlaceReview from './PlaceReview';
import { Review } from '../../services/ReviewService';

type Props = {
  reviews: Review[]
};

export default function PlaceReviewsList({ reviews }: Props) {
  const contentReviews = reviews.filter(
    r => r.content && r.content.trim() !== ''
  );

  return (
    <View style={styles.container}>
      <Text style={styles.center} category='h6'>Newest Reviews</Text>

      {contentReviews.length === 0 ? (
        <Text style={styles.center}>
          This location does not have any reviews yet.
        </Text>
      ) : (
          <View style={styles.list}>
            {contentReviews.map(r => <PlaceReview review={r} key={r.id} />)}
          </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  list: {
    marginTop: 5
  },
  center: {
    textAlign: 'center'
  }
});