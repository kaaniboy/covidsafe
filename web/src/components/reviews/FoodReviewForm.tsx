import React from 'react';
import { Review } from '../../services/ReviewService';
import RadioQuestion from './RadioQuestion';

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
    </div>
  );
}