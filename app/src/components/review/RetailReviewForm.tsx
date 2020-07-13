import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Text } from '@ui-kitten/components';
import RadioQuestion from './RadioQuestion';
import RatingQuestion from './RatingQuestion';
import { Review } from '../../services/ReviewService';

const DIVIDER_OPTIONS = [
  { label: 'Yes', value:  1 },
  { label: 'No', value: 0 },
  { label: 'Not sure', value: undefined },
];

type Props = {
  review: Review,
  onFieldChange: (field: string, value: any) => void
};

export default function RetailReviewForm({ review, onFieldChange }: Props) {
  return (
    <View style={styles.container}>
      <RadioQuestion
        question='Does this location have dividers (eg, plexiglass) installed?'
        options={DIVIDER_OPTIONS}
        value={review.dividers}
        onChange={value => onFieldChange('dividers', value)}
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
          placeholder='Include any other details related to your visit here.'
          value={review.content}
          onChange={event => onFieldChange('content', event.nativeEvent.text)}
          enablesReturnKeyAutomatically={false}
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