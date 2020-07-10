import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import { RouteProp, NavigationProp, Route } from '@react-navigation/core';
import ConfirmationModal from '../components/ConfirmationModal';
import RatingSelect from '../components/RatingSelect';
import ReviewService, { Review } from '../services/ReviewService';
import Constants from 'expo-constants';
import { StackParamList } from '../../App';

type Props = {
  navigation: NavigationProp<StackParamList>,
  route: RouteProp<StackParamList, 'Review'>
};

type State = {
  isConfirmationVisible: boolean,
  review: Review,
  value: number
};

export default class ReviewScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const placeId = this.props.route.params.place.id as string;
    const userId = Constants.deviceId || 'DEVICE_ID_MISSING';

    this.state = {
      isConfirmationVisible: false,
      review: { placeId, userId } as Review,
      value: 1
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
          <RatingSelect
            label='On a scale of 1 - 5, how consistent are employees in wearing masks?'
            value={review.masks}
            onChange={value => this.updateReview('masks', value)}
          />
          <RatingSelect
            label='On a scale of 1 - 5, how effectively does the business handle contactless pick-up and drive-thru?'
            value={review.pickup}
            onChange={value => this.updateReview('pickup', value)}
          />
          <RatingSelect
            label='On a scale of 1 - 5, how effectively is social distancing (6ft) enforced?'
            value={review.distancing}
            onChange={value => this.updateReview('distancing', value)}
          />
          <Text style={styles.center}>
            Any additional information?
        </Text>
          <Input
            style={styles.formControl}
            textStyle={styles.reviewContent}
            placeholder='Include any other details related to your visit here'
            value={review.content}
            onChange={event => this.updateReview('content', event.nativeEvent.text)}
            multiline
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
  },
  formControl: {
    marginVertical: 10
  },
  reviewContent: {
    minHeight: 100
  },
  center: {
    textAlign: 'center'
  }
});