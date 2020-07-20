import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Place } from '../../services/PlaceService';
import RatingService, { PlaceRating, RatingCategory, RISK_COLORS } from '../../services/RatingService';
import PlaceCategoryRatingPanel from './PlaceCategoryRatingPanel';

type Props = {
  place: Place,
  rating: PlaceRating
};

const FOOD_CATEGORIES = [
  { name: 'employeeMasks', label: 'Employee Masks' },
  { name: 'customerMasks', label: 'Customer Masks' },
  { name: 'distancing', label: 'Social Distancing' },
  { name: 'diningTypes', label: 'Dining Styles' }
] as { name: RatingCategory, label: string }[];

const RETAIL_CATEGORIES = [
  { name: 'employeeMasks', label: 'Employee Masks' },
  { name: 'customerMasks', label: 'Customer Masks' },
  { name: 'distancing', label: 'Social Distancing' },
  { name: 'dividers', label: 'Plexiglass Dividers' }
] as { name: RatingCategory, label: string }[];

export default function PlaceRatingsOverview({ place, rating }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<RatingCategory>('employeeMasks');

  const categories = place.category === 'Food'
    ? FOOD_CATEGORIES
    : RETAIL_CATEGORIES;

  const buttons = categories.map(category => (
    <Button
      className='category-button'
      size='sm'
      variant={
        (selectedCategory === category.name
          ? ''
          : 'outline-'
        ) + RISK_COLORS[RatingService.getCategoryRisk(rating, category.name)]
      }
      block
      key={category.name}
      onClick={() => setSelectedCategory(category.name)}
    >
      {category.label}
    </Button>
  ));

  return (
    <div className='place-ratings-overview'>
      <Row>
        <Col
          className='category-buttons text-center'
          xs={{ span: 5, offset: 1 }}
        >
          {buttons}
        </Col>
        <Col xs={5}>
          <PlaceCategoryRatingPanel
            rating={rating}
            category={selectedCategory}
          />
        </Col>
      </Row>
    </div>
  );
}