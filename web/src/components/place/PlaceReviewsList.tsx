import React from 'react';
import { Review } from '../../services/ReviewService';

type Props = {
  reviews: Review[]
};

export default function PlaceReviewsList({ reviews }: Props) {
  const contentReviews = reviews.filter(
    r => r.content && r.content.trim() !== ''
  );

  return (
    <div className='place-reviews-list'>
      {contentReviews.length === 0 ? (
        <p className='no-reviews'>
          This location does not have any reviews yet.
        </p>
      ) : (
          <p>NELK</p>
        )
      }
    </div>
  );
}