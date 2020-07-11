import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Layout, Button } from '@ui-kitten/components';
import { RouteProp, NavigationProp } from '@react-navigation/core';
import ConfirmationModal from '../components/review/ConfirmationModal';
import ReviewService, { Review } from '../services/ReviewService';
import { Place } from '../services/PlaceService';
import Constants from 'expo-constants';
import { StackParamList } from '../../App';
import FoodReviewForm from '../components/review/FoodReviewForm';

type Props = {
  navigation: NavigationProp<StackParamList>,
  route: RouteProp<StackParamList, 'Review'>
};

type State = {
  isConfirmationVisible: boolean,
  place: Place,
  review: Review
};

export default class ReviewScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const place = this.props.route.params.place as Place;
    const userId = Constants.deviceId || 'DEVICE_ID_MISSING';

    console.log(place);

    this.state = {
      place,
      isConfirmationVisible: false,
      review: { userId, placeId: place.id } as Review
    };
  }

  submitReview = async () => {
    const { review } = this.state;
    try {
      await ReviewService.createReview(review);
      this.setState({ isConfirmationVisible: true });
    } catch (error) {
      console.log(error);
    }
  }

  confirm = () => {
    this.setState({ isConfirmationVisible: false });
    this.props.navigation.goBack();
  }

  updateReview = (field: string, value: any) => {
    const { review } = this.state;
    (review as any)[field] = value;
    this.setState({ review });
  }

  render() {
    const { review, isConfirmationVisible } = this.state;

    return (
      <Layout style={styles.layout}>
        <ScrollView>
          <ConfirmationModal
            isVisible={isConfirmationVisible}
            onConfirm={this.confirm}
          />
          <FoodReviewForm
            review={review}
            onFieldChange={this.updateReview}
          />
          <Button onPress={this.submitReview}>
            Submit Review
          </Button>
        </ScrollView>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    padding: 10
  }
});