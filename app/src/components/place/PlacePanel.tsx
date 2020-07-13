import React from 'react';
import { StyleSheet, View, YellowBox } from 'react-native';
import { Layout, Button, Spinner } from '@ui-kitten/components';
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
  isLoading: boolean,
  reviews: Review[],
  rating: PlaceRating
};

export default class PlacePanel extends React.Component<Props, State> {
  state = {
    isLoading: false,
    reviews: [],
    rating: { categories: {} }
  };

  async componentDidMount() {
    await this.retrieveReviews();
  }

  async retrieveReviews() {
    const { place } = this.props;
    this.setState({ isLoading: true });

    try {
      const reviews = await ReviewService.getPlaceReviews(place.id);
      const rating = RatingService.ratePlace(reviews);
      console.log(rating);
      this.setState({ reviews, rating });
    } catch (error) {
      console.log(error);
      this.setState({
        reviews: [],
        rating: { categories: {} }
      });
    }

    this.setState({ isLoading: false });
  }

  openReviewScreen = () => {
    const { place } = this.props;
    this.props.navigation.navigate('Review', { place });
  }

  render() {
    const { place } = this.props;
    const { isLoading, reviews, rating } = this.state;

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
        <RiskIndicator risk='low' />

        <View style={styles.container}>
          <PlaceRatingsOverview place={place} rating={rating}/>
          <PlaceReviewsList reviews={reviews} />
          <Button
            size='small'
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
  center: {
    alignItems: 'center',
    textAlign: 'center'
  }
});