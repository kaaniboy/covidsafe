import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Text } from '@ui-kitten/components';
import RadioQuestion from './RadioQuestion';
import RatingQuestion from './RatingQuestion';
import { Review } from '../../services/ReviewService';

const DINING_OPTIONS = [
  { label: 'Dine-In', value: 'dine_in' },
  { label: 'Pick-Up', value: 'pick_up' },
  { label: 'Drive-Thru', value: 'drive_thru' },
  { label: 'None of the above', value: undefined }
];

type Props = {
  review: Review,
  onFieldChange: (field: string, value: any) => void
};

export default function FoodReviewForm({ review, onFieldChange }: Props) {
  return (
    <View style={styles.container}>
      <RadioQuestion
        question='What dining style did you use?'
        options={DINING_OPTIONS}
        value={review.diningType}
        onChange={value => onFieldChange('diningType', value)}
      />

      <RatingQuestion
        question='Do employees wear masks?'
        leftLabel='None'
        rightLabel='All'
        value={review.employeeMasks}
        onChange={value => onFieldChange('employeeMasks', value)}
      />

      <RatingQuestion
        question='Do customers wear masks?'
        leftLabel='None'
        rightLabel='All'
        value={review.customerMasks}
        onChange={value => onFieldChange('customerMasks', value)}
      />

      <RatingQuestion
        question='How carefully is social distancing enforced?'
        leftLabel='Not at all'
        rightLabel='Very carefully'
        value={review.distancing}
        onChange={value => onFieldChange('distancing', value)}
      />

      <View style={styles.additionalInfo}>
        <Text style={styles.center} category='s1'>
          Any additional comments?
        </Text>
        <Input
          style={styles.formControl}
          textStyle={styles.reviewContent}
          placeholder='Include any other details related to your visit.'
          value={review.content}
          onChange={event => onFieldChange('content', event.nativeEvent.text)}
          enablesReturnKeyAutomatically={false}
          returnKeyType='done'
          blurOnSubmit
          multiline
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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