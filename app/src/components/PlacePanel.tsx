import React from 'react';
import { StyleSheet, View, YellowBox } from 'react-native';
import { Layout, Text, List, ListItem, Divider, Spinner } from '@ui-kitten/components';
import { Icon } from 'react-native-eva-icons';
import { Place } from '../services/PlaceService';
import ReviewService, { Review } from '../services/ReviewService';
import RiskIndicator from '../components/RiskIndicator';
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

  renderReview({ item }: { item: Review }) {
    return (
      <ListItem>
        <Text>{item.content || ''}</Text>
      </ListItem>
    );
  }

  renderReviewIcon() {
    return (
      <Icon
        style={styles.icon}
        name='message-circle-outline'
        width={32}
        height={32}
        fill='black'
        onPress={this.openReviewScreen}
      />
    );
  }

  render() {
    const { place } = this.props;
    const { isLoading, reviews } = this.state;

    return (
      <Layout>
        <RiskIndicator risk='low' />

        <View style={styles.container}>
          <View style={styles.header}>
            <Text category='h5'>{place.name}</Text>
            {this.renderReviewIcon()}
          </View>

          {isLoading && (
            <View style={styles.center}>
              <Spinner size='giant' />
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
            <Text style={styles.center}>
              This location does not have any reviews yet.
          </Text>
          )}
        </View>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 15
  },
  container: {
    margin: 10
  },
  icon: {
    marginLeft: 5,
    marginTop: -2
  },
  center: {
    alignItems: 'center',
    textAlign: 'center'
  },
  reviews: {
    marginTop: 10
  },
});