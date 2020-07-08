import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, List, ListItem, Divider } from '@ui-kitten/components';
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

  renderReview({ item, index }: { item: Review, index: number }) {
    return (
      <ListItem>
        <Text>{item.content || ''}</Text>
      </ListItem>
    );
  }

  render() {
    const { place } = this.props;
    const { isLoading, reviews } = this.state;

    return (
      <Layout style={styles.layout}>
        <Text category='h5'>{place.name}</Text>
        <List
          style={styles.reviews}
          data={reviews}
          ItemSeparatorComponent={Divider}
          renderItem={this.renderReview}
        />
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  layout: {
    margin: 10
  },
  reviews: {
    marginTop: 10
  }
});