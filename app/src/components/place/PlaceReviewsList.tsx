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
      {contentReviews.length === 0 ? (
        <Text style={[styles.noReviews, styles.center]}>
          This location does not have any written reviews yet.
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
    marginTop: 5,
    marginBottom: 40
  },
  list: {
    marginTop: 5
  },
  noReviews: {
    marginTop: 5
  },
  center: {
    textAlign: 'center'
  }
});