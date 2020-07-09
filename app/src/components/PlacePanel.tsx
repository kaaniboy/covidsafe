import React from 'react';
import { StyleSheet, View, YellowBox} from 'react-native';
import { Layout, Text, List, ListItem, Divider, Spinner } from '@ui-kitten/components';
import { Place } from '../services/PlaceService';
import ReviewService, { Review } from '../services/ReviewService';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested'
]);

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
        <Text style={styles.header} category='h5'>{place.name}</Text>

        {isLoading && (
          <View style={styles.spinner}>
            <Spinner size='giant'/>
          </View>
        )}

        {!isLoading && reviews.length > 0 && (
          <>
            <Text category='h6'>Reviews</Text>
            <List
              style={styles.reviews}
              data={reviews}
              ItemSeparatorComponent={Divider}
              renderItem={this.renderReview}
              scrollEnabled={false}
            />
          </>
        )}

        {!isLoading && reviews.length === 0 && (
          <Text>This location does not have any reviews yet.</Text>
        )}
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
  },
  header: {
    alignSelf: 'center',
    marginBottom: 20
  },
  spinner: {
    alignItems: 'center'
  }
});