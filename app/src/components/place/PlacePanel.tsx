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
import RatingService, { PlaceRating, Risk } from '../../services/RatingService';

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

const DEFAULT_RATING: PlaceRating = {
  categories: {},
  overallRisk: 'unknown'
};

/*
  Used to persist place reviews between the small
  and large forms of the panel.
*/
let PLACE: Place | null = null;
let PLACE_RATING: PlaceRating | null = null;
let PLACE_REVIEWS: Review[] | null = null;

export default class PlacePanel extends React.Component<Props, State> {
  unsubscribeFocus: (() => void) | null = null;

  state = {
    reviews: [],
    rating: DEFAULT_RATING,
    isLoading: false,
    loadingFailed: false
  };

  async componentDidMount() {
    await this.retrieveReviews();
  }

  async retrieveReviews() {
    const { place } = this.props;

    if (PLACE && place.id == PLACE.id) {
      this.setState({
        reviews: PLACE_REVIEWS!,
        rating: PLACE_RATING!
      });
      return;
    }

    this.setState({ isLoading: true, loadingFailed: false });

    try {
      PLACE = place;
      PLACE_REVIEWS = await ReviewService.getPlaceReviews(place.id);
      PLACE_RATING = RatingService.ratePlace(PLACE_REVIEWS);

      this.setState({
        reviews: PLACE_REVIEWS,
        rating: PLACE_RATING,
        isLoading: false
      });
    } catch (error) {
      console.log(error);

      PLACE = PLACE_REVIEWS = PLACE_RATING = null;
      this.setState({
        reviews: [],
        rating: DEFAULT_RATING,
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
        PLACE = PLACE_RATING = PLACE_REVIEWS = null;
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
        <RiskIndicator risk={rating.overallRisk} />

        <View style={styles.container}>
          <PlaceRatingsOverview place={place} rating={rating} />

          <Text
            style={[styles.reviewHeader, styles.center]}
            category='h5'>
            Newest Reviews
          </Text>
          <Button
            size='tiny'
            appearance='outline'
            style={styles.reviewButton}
            onPress={this.openReviewScreen}
          >
            Write a review
          </Button>
          <PlaceReviewsList reviews={reviews} />
        </View>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  reviewHeader: {
    marginTop: 20
  },
  reviewButton: {
    marginVertical: 5,
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