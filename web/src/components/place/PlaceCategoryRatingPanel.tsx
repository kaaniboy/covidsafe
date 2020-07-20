import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RatingService, { PlaceRating, RatingCategory, RISK_COLORS } from '../../services/RatingService';
import { DiningType } from '../../services/ReviewService';

type Props = {
  rating: PlaceRating,
  category: RatingCategory
};

const DINING_TYPE_LABELS = {
  'dine_in': 'Dine-In',
  'drive_thru': 'Drive-Thru',
  'pick_up': 'Pick-Up'
} as { [key in DiningType]: string };

function renderCheckMark() {
  return (
    <FontAwesomeIcon
      className='check-icon'
      icon='check'
      color='#00E096'
      size='lg'
    />
  );
}

function renderDiningTypes(rating: PlaceRating) {
  if (!rating.diningTypes) {
    return null;
  }

  return (
    <div>
      <p className='text-center rating-message'>
        This location offers these dining styles:
      </p>
      {Object.keys(DINING_TYPE_LABELS).map(type => (
        rating.diningTypes![type as DiningType] > 0 && (
          <p className='dining-type text-center'>
            {renderCheckMark()}
            {DINING_TYPE_LABELS[type as DiningType]}
          </p>
        )
      ))}
    </div>
  );
}

export default function PlaceCategoryRatingPanel({ rating, category }: Props) {
  const formattedRating = RatingService.formatCategoryRating(rating, category);
  const categoryMessage = RatingService.getCategoryMessage(rating, category);
  const categoryRisk = RatingService.getCategoryRisk(rating, category);

  const formattedRatingText = formattedRating && (
    <h4 className={`category-rating text-center text-${RISK_COLORS[categoryRisk]}`}>
      {formattedRating}
    </h4>
  );

  const categoryMessageText = categoryMessage && (
    <p className='text-center rating-message'>
      {RatingService.getCategoryMessage(rating, category)}
    </p>
  );

  return (
    <div className='category-rating-panel'>
      {category === 'diningTypes'
        ? renderDiningTypes(rating)
        : formattedRatingText
      }
      {categoryMessageText}
    </div>
  );
}