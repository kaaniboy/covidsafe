import React from 'react';
import { Form } from 'react-bootstrap';
import RadioQuestion from './RadioQuestion';
import RatingQuestion from './RatingQuestion';
import { Review } from '../../services/ReviewService';

const DIVIDER_OPTIONS = [
  { label: 'Yes', value: 1 },
  { label: 'No', value: 0 },
  { label: 'Not sure', value: undefined },
];

type Props = {
  review: Review,
  onFieldChange: (field: string, value: any) => void
};

export default function RetailReviewForm({ review, onFieldChange }: Props) {
  return (
    <div className='review-form'>
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

      <h6 className='text-center'>Any additional comments?</h6>
      <Form.Control
        value={review.content}
        as="textarea"
        rows={3}
        placeholder='Include any other details related to your visit.'
        onChange={event => onFieldChange('content', event.target.value)}
      />
    </div>
  );
}
