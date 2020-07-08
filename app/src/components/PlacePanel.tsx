import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { Place } from '../services/PlaceService';
import ReviewService, { Review } from '../services/ReviewService';

type Props = {
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

  async componentDidUpdate(prevProps: Props) {
    if (this.props.place.id === prevProps.place.id) {
      return;
    }
    await this.retrieveReviews();
  }

  async retrieveReviews() {
    const { place } = this.props;
    try {
      const reviews = await ReviewService.getPlaceReviews(place.id);
      this.setState({ reviews });
    } catch (error) {
      console.log(error);
      this.setState({ reviews: [] });
    }
  }

  render() {
    const { place } = this.props;
    const { isLoading, reviews } = this.state;

    return (
      <Layout>
        <Text>{place.name}</Text>
        <Text>Reviews: {reviews.length}</Text>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({});