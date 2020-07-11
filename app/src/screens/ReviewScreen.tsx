import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import { RouteProp, NavigationProp } from '@react-navigation/core';
import ConfirmationModal from '../components/ConfirmationModal';
import RadioQuestion from '../components/RadioQuestion';
import RatingQuestion from '../components/RatingQuestion';
import ReviewService, { Review } from '../services/ReviewService';
import Constants from 'expo-constants';
import { StackParamList } from '../../App';

type Props = {
  navigation: NavigationProp<StackParamList>,
  route: RouteProp<StackParamList, 'Review'>
};

type State = {
  isConfirmationVisible: boolean,
  review: Review
};

const DINING_OPTIONS = [
  { label: 'Dine-In', value: 'dine_in' },
  { label: 'Pick-Up', value: 'pick_up' },
  { label: 'Drive-Thru', value: 'drive_thru' },
  { label: 'None of the above', value: undefined }
];

export default class ReviewScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const placeId = this.props.route.params.place.id as string;
    const userId = Constants.deviceId || 'DEVICE_ID_MISSING';

    this.state = {
      isConfirmationVisible: false,
      review: { placeId, userId } as Review
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

          <RadioQuestion
            question='What dining style did you use?'
            options={DINING_OPTIONS}
            value={review.diningType}
            onChange={value => this.updateReview('diningType', value)}
          />

          <RatingQuestion
            question='How many employees wear masks?'
            leftLabel='None'
            rightLabel='All'
            value={review.employeeMasks}
            onChange={value => this.updateReview('employeeMasks', value)}
          />

          <RatingQuestion
            question='How many customers wear masks?'
            leftLabel='None'
            rightLabel='All'
            value={review.customerMasks}
            onChange={value => this.updateReview('customerMasks', value)}
          />

          <RatingQuestion
            question='How carefully is social distancing enforced?'
            leftLabel='Not at all'
            rightLabel='Very carefully'
            value={review.distancing}
            onChange={value => this.updateReview('distancing', value)}
          />

          <View style={styles.additionalInfo}>
            <Text style={styles.center} category='s1'>
              Any additional comments?
          </Text>
            <Input
              style={styles.formControl}
              textStyle={styles.reviewContent}
              placeholder='Include any other details related to your visit here.'
              value={review.content}
              onChange={event => this.updateReview('content', event.nativeEvent.text)}
              enablesReturnKeyAutomatically={false}
              multiline
            />
          </View>

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
    marginVertical: 20
  },
  reviewContent: {
    minHeight: 100
  },
  additionalInfo: {
    marginTop: 10
  },
  center: {
    textAlign: 'center'
  }
});