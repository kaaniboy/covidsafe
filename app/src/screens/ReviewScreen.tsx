import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Layout, Button, Text, Divider } from '@ui-kitten/components';
import { RouteProp, NavigationProp } from '@react-navigation/core';
import ConfirmationModal from '../components/review/ConfirmationModal';
import ReviewService, { Review } from '../services/ReviewService';
import { Place } from '../services/PlaceService';
import Constants from 'expo-constants';
import { StackParamList } from '../../App';
import FoodReviewForm from '../components/review/FoodReviewForm';
import RetailReviewForm from '../components/review/RetailReviewForm';

type Props = {
  navigation: NavigationProp<StackParamList>,
  route: RouteProp<StackParamList, 'Review'>
};

type State = {
  review: Review,
  isConfirmationModalVisible: boolean,
  isConnectionModalVisible: boolean
};

export default class ReviewScreen extends React.Component<Props, State> {
  place: Place;

  constructor(props: Props) {
    super(props);

    this.place = this.props.route.params.place as Place;
    const userId = Constants.deviceId || 'DEVICE_ID_MISSING';

    this.state = {
      review: { userId, placeId: this.place.id } as Review,
      isConfirmationModalVisible: false,
      isConnectionModalVisible: false
    };
  }

  submitReview = async () => {
    const { review } = this.state;
    try {
      await ReviewService.createReview(review);
      this.setState({ isConfirmationModalVisible: true });
    } catch (error) {
      console.log(error);
      this.setState({ isConnectionModalVisible: true });
    }
  }

  confirm = () => {
    this.setState({ isConfirmationModalVisible: false });
    this.props.navigation.goBack();
  }

  updateReview = (field: string, value: any) => {
    const { review } = this.state;
    (review as any)[field] = value;
    this.setState({ review });
  }

  render() {
    const {
      review,
      isConfirmationModalVisible,
      isConnectionModalVisible
    } = this.state;

    return (
      <Layout style={styles.layout}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ConfirmationModal
            message='Your review has been submitted.\nThank you!'
            isVisible={isConfirmationModalVisible}
            onConfirm={this.confirm}
          />
          <ConfirmationModal
            message='Something went wrong.\nCheck your connection and try again.'
            isVisible={isConnectionModalVisible}
            onConfirm={() => this.setState({ isConnectionModalVisible: false })}
          />

          <Text style={styles.description}>
            Answer the following questions about <Text category="s1">{this.place.name}</Text>.
            {' '}You may leave questions unanswered.
          </Text>
          <Divider />

          {this.place.category === 'Food' ?
            (
              <FoodReviewForm
                review={review}
                onFieldChange={this.updateReview}
              />
            ) : (
              <RetailReviewForm
                review={review}
                onFieldChange={this.updateReview}
              />
            )
          }

          <Button style={styles.submitButton} onPress={this.submitReview}>
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
  },
  description: {
    textAlign: 'center',
    marginVertical: 10
  },
  submitButton: {
    marginBottom: 80
  }
});