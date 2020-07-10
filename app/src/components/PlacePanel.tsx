import React from 'react';
import { StyleSheet, View, YellowBox } from 'react-native';
import { Layout, Text, Button, Spinner } from '@ui-kitten/components';
import { Place } from '../services/PlaceService';
import ReviewService, { Review } from '../services/ReviewService';
import RiskIndicator from '../components/RiskIndicator';
import PlaceHeader from '../components/PlaceHeader';
import PlaceOverview from '../components/PlaceOverview';
import PlaceReviewsList from './PlaceReviewsList';
import { NavigationProp } from '@react-navigation/core';
import { StackParamList } from '../../App';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested'
]);

type Props = {
  navigation: NavigationProp<StackParamList>,
  place: Place
};

type State = {
  isLoading: boolean,
  reviews: Review[]
};

export default class PlacePanel extends React.Component<Props, State> {
  state = {
    isLoading: false,
    reviews: []
  };

  async componentDidMount() {
    await this.retrieveReviews();
  }

  async retrieveReviews() {
    const { place } = this.props;
    this.setState({ isLoading: true });

    try {
      const reviews = await ReviewService.getPlaceReviews(place.id);
      this.setState({ reviews });
    } catch (error) {
      console.log(error);
      this.setState({ reviews: [] });
    }

    this.setState({ isLoading: false });
  }

  openReviewScreen = () => {
    const { place } = this.props;
    this.props.navigation.navigate('Review', { place });
  }

  render() {
    const { place } = this.props;
    const { isLoading, reviews } = this.state;

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
          <PlaceOverview place={place} />
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