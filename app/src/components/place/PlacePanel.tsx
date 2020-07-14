import React from 'react';
import { StyleSheet, View, YellowBox } from 'react-native';
import { Layout, Button, Spinner, Text } from '@ui-kitten/components';
import { Place } from '../../services/PlaceService';
import ReviewService, { Review } from '../../services/ReviewService';
import RiskIndicator from './RiskIndicator';
import PlaceHeader from './PlaceHeader';
import PlaceRatingsOverview from './PlaceRatingsOverview';
import PlaceReviewsList from './PlaceReviewsList';
import { NavigationProp } from '@react-navigation/core';
import { StackParamList } from '../../../App';
import RatingService, { PlaceRating } from '../../services/RatingService';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested'
]);

type Props = {
  navigation: NavigationProp<StackParamList>,
  place: Place
};

type State = {
  reviews: Review[],
  rating: PlaceRating,
  isLoading: boolean,
  loadingFailed: boolean,
};

export default class PlacePanel extends React.Component<Props, State> {
  unsubscribeFocus: (() => void) | null = null;

  state = {
    reviews: [],
    rating: { categories: {} },
    isLoading: false,
    loadingFailed: false
  };

  async componentDidMount() {
    await this.retrieveReviews();
  }

  async retrieveReviews() {
    const { place } = this.props;
    this.setState({ isLoading: true, loadingFailed: false });

    try {
      const reviews = await ReviewService.getPlaceReviews(place.id);
      const rating = RatingService.ratePlace(reviews);

      this.setState({
        reviews,
        rating,
        isLoading: false
      });
    } catch (error) {
      console.log(error);
      this.setState({
        reviews: [],
        rating: { categories: {} },
        isLoading: false,
        loadingFailed: true
      });
    }
  }

  openReviewScreen = () => {
    if (this.unsubscribeFocus) {
      this.unsubscribeFocus();
    }

    // Re-retrieve reviews after the user submits a review
    this.unsubscribeFocus =
      this.props.navigation.addListener('focus', async () => {
        await this.retrieveReviews();
      });

    const { place } = this.props;
    this.props.navigation.navigate('Review', { place });
  }

  render() {
    const { place } = this.props;
    const { reviews, rating, isLoading, loadingFailed } = this.state;

    if (loadingFailed) {
      return (
        <View style={styles.center}>
          <Text category='h6' style={styles.failedText}>
            Something went wrong
          </Text>
          <Text category='s1' style={styles.failedText}>
            Check your connection and try again.
          </Text>
        </View>
      );
    }

    if (isLoading) {
      return (
        <View style={styles.center}>
          <Spinner size='giant' />
        </View>
      );
    }

    return (
      <Layout>
        <PlaceHeader place={place} />
        <RiskIndicator risk='unknown' />

        <View style={styles.container}>
          <PlaceRatingsOverview place={place} rating={rating} />
          <PlaceReviewsList reviews={reviews} />
          <Button
            size='small'
            appearance='outline'
            style={styles.reviewButton}
            onPress={this.openReviewScreen}
          >
            Write a review
          </Button>
        </View>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  reviewButton: {
    marginTop: 20,
    width: '60%',
    alignSelf: 'center'
  },
  icon: {
    marginLeft: 5,
    marginTop: -2
  },
  failedText: {
    marginTop: 5
  },
  center: {
    alignItems: 'center',
    textAlign: 'center'
  }
});