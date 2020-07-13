import { Review } from './ReviewService';

export type RatingCategory =
  'employeeMasks' | 'customerMasks' | 'distancing' | 'dividers';


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

const RATING_CATEGORY_MESSAGES = {
  'employeeMasks': 'Employees %s wear masks.',
  'customerMasks': 'Customers %s wear masks.',
  'distancing': 'Social distancing is %s enforced.',
  'dividers': ''
} as { [key in RatingCategory]: string };

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
      'distancing': calculateRating('distancing', reviews),
      'dividers': calculateRating('dividers', reviews)
    }
  };
}

function getCategoryMessage(
  rating: PlaceRating,
  category: RatingCategory
): string {
  if (!rating.categories[category]) {
    return 'No reviews yet.';
  }

  const score = rating.categories[category]!;

  let modifier = 'almost always';
  if (score <= 2.5) {
    modifier = 'rarely';
  } else if (score <= 4) {
    modifier = 'often';
  }

  return RATING_CATEGORY_MESSAGES[category].replace('%s', modifier);
}

export default {
  ratePlace,
  getCategoryMessage
};