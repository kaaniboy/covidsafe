import React from 'react';
import { Form } from 'react-bootstrap';
import { Review } from '../../services/ReviewService';
import RadioQuestion from './RadioQuestion';
import RatingQuestion from './RatingQuestion';

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
    <div className='review-form'>
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

      <h6 className='text-center'>Any additional comments?</h6>
      <Form.Control
        as="textarea"
        rows={3}
        placeholder='Include any other details related to your visit.'
      />
    </div>
  );
}