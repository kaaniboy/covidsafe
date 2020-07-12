
import { Review } from './ReviewService';

export type RatingCategory = 'employeeMasks' | 'customerMasks' | 'distancing';

export type PlaceRating = {
  categories: {
    [key in RatingCategory]?: number
  },
  diningTypes?: {
    dineIn: number,
    pickUp: number,
    driveThru: number
  }
};

function calculateRating(
  category: RatingCategory,
  reviews: Review[]
): number | undefined {
  const ratings = reviews
    .map(r => (r as any)[category])
    .filter(v => v) as number[];

  if (ratings.length === 0) {
    return undefined;
  }

  return ratings.reduce((a, b) => a + b) / ratings.length;
}

function ratePlace(reviews: Review[]): PlaceRating {
  return {
    categories: {
      'employeeMasks': calculateRating('employeeMasks', reviews),
      'customerMasks': calculateRating('customerMasks', reviews),
      'distancing': calculateRating('distancing', reviews)
    }
  };
}

export default {
  ratePlace
};