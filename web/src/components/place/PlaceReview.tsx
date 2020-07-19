import React from 'react';
import { Review } from '../../services/ReviewService';
import moment from 'moment';

type Props = {
  review: Review
};

export default function PlaceREview({ review }: Props) {
  const elapsed = moment.utc(review.createdAt!)
    .fromNow().toUpperCase();

  return (
    <div className='place-review' key={review.id}>
      <p className='review-time'>{elapsed}</p>
      <p className='review-text'>{review.content}</p>
    </div>
  );
}