import { Review, DiningType } from './ReviewService';

export type Risk =
  'unknown' | 'low' | 'medium' | 'high';

export type RatingCategory =
  'employeeMasks' | 'customerMasks' | 'distancing' | 'dividers' | 'diningTypes';

export type PlaceRating = {
  categories: {
    [key in RatingCategory]?: number
  },
  diningTypes?: {
    [key in DiningType]: number
  }
};

export const RISK_COLORS: { [key in Risk]: string } = {
  'unknown': 'primary',
  'low': 'success',
  'medium': 'info',
  'high': 'danger'
}

const NO_RATINGS_MESSAGE = 'This category does not have any ratings yet.';
const RATING_CATEGORY_MESSAGES: { [key in RatingCategory]: string } = {
  'employeeMasks': 'Employees %s wear masks.',
  'customerMasks': 'Customers %s wear masks.',
  'distancing': 'Social distancing is %s enforced.',
  'dividers': 'of reviewers say dividers are present.',
  'diningTypes': ''
};

function calculateCategoryRating(
  category: RatingCategory,
  reviews: Review[]
): number | undefined {
  const ratings = reviews
    .map(r => (r as any)[category])
    .filter(v => v !== null) as number[];

  if (ratings.length === 0) {
    return undefined;
  }

  return ratings.reduce((a, b) => a + b) / ratings.length;
}

type DiningTypeFrequencies = { [key in DiningType]: number };

function extractDiningTypeFrequencies(
  reviews: Review[]
): DiningTypeFrequencies | undefined {
  let total = 0;
  const frequencies = reviews.reduce(
    (freqs, r) => {
      if (!r.diningType) {
        return freqs;
      }
      total++;
      return {
        ...freqs,
        [r.diningType]: (freqs[r.diningType] || 0) + 1
      };
    }, {} as DiningTypeFrequencies);

  if (total === 0) {
    return undefined;
  }
  return frequencies;
}

function ratePlace(reviews: Review[]): PlaceRating {
  return {
    categories: {
      'employeeMasks': calculateCategoryRating('employeeMasks', reviews),
      'customerMasks': calculateCategoryRating('customerMasks', reviews),
      'distancing': calculateCategoryRating('distancing', reviews),
      'dividers': calculateCategoryRating('dividers', reviews),
    },
    diningTypes: extractDiningTypeFrequencies(reviews)
  };
}

function getCategoryMessage(
  rating: PlaceRating,
  category: RatingCategory
): string | undefined {
  if (category === 'diningTypes') {
    return rating.diningTypes ? undefined : NO_RATINGS_MESSAGE;
  }

  if (!rating.categories[category]) {
    return NO_RATINGS_MESSAGE;
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

function getCategoryRisk(
  rating: PlaceRating,
  category: RatingCategory
): Risk {
  if (category === 'diningTypes' || !rating.categories[category]) {
    return 'unknown';
  }

  const score = rating.categories[category]!;

  const adjustThreshold = (value:  number) =>
    category === 'dividers' ? 0.25 * (value - 1) : value;

  let risk: Risk = 'low';
  if (score <= adjustThreshold(2.5)) {
    risk = 'high';
  } else if (score <= adjustThreshold(4)) {
    risk = 'medium';
  }

  return risk;
}

function formatCategoryRating(
  rating: PlaceRating,
  category: RatingCategory
): string | null {
  if (!rating.categories[category]) {
    return null;
  }

  return category === 'dividers'
    ? `${(rating.categories[category]! * 100).toFixed(0)}%`
    : `${rating.categories[category]!.toFixed(1)} / 5`;
}

export default {
  ratePlace,
  getCategoryMessage,
  getCategoryRisk,
  formatCategoryRating
};