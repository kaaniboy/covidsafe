import { Review, DiningType } from './ReviewService';

export type Risk =
  'unknown' | 'low' | 'medium' | 'high';

export type RatingCategory =
  'employeeMasks' | 'customerMasks' | 'distancing' | 'dividers' | 'diningTypes';

export type PlaceRating = {
  overallRisk: Risk,
  categories: {
    [key in RatingCategory]?: number
  },
  diningTypes?: {
    [key in DiningType]: number
  }
};

const RISK_THRESHOLDS = {
  high: 2.5,
  medium: 4
};

export const RISK_COLORS: { [key in Risk]: string } = {
  'unknown': 'primary',
  'low': 'success',
  'medium': 'warning',
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

function calculateOverallRisk(
  categories: { [key in RatingCategory]?: number }
): Risk {
  const categoryCount =
    Object.values(categories).filter(v => v !== undefined).length;

  if (categoryCount === 0) {
    return 'unknown';
  }

  const ratingSum =
    (categories['employeeMasks'] || 0)
    + (categories['customerMasks'] || 0)
    + (categories['distancing'] || 0)
    // Convert dividers category to 1 - 5 scale
    + (categories['dividers'] === undefined ? 0 : categories['dividers']! * 4 + 1);

  const overallRating = ratingSum / categoryCount;

  if (overallRating <= RISK_THRESHOLDS.high) {
    return 'high';
  } else if (overallRating <= RISK_THRESHOLDS.medium) {
    return 'medium';
  }
  return 'low';
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
  const categories = {
    'employeeMasks': calculateCategoryRating('employeeMasks', reviews),
    'customerMasks': calculateCategoryRating('customerMasks', reviews),
    'distancing': calculateCategoryRating('distancing', reviews),
    'dividers': calculateCategoryRating('dividers', reviews),
  };

  return {
    overallRisk: calculateOverallRisk(categories),
    diningTypes: extractDiningTypeFrequencies(reviews),
    categories
  };
}

function getCategoryMessage(
  rating: PlaceRating,
  category: RatingCategory
): string | undefined {
  if (category === 'diningTypes') {
    return rating.diningTypes ? undefined : NO_RATINGS_MESSAGE;
  }

  if (rating.categories[category] === undefined) {
    return NO_RATINGS_MESSAGE;
  }

  const score = rating.categories[category]!;

  let modifier = 'almost always';
  if (score <= RISK_THRESHOLDS.high) {
    modifier = 'rarely';
  } else if (score <= RISK_THRESHOLDS.medium) {
    modifier = 'often';
  }

  return RATING_CATEGORY_MESSAGES[category].replace('%s', modifier);
}

function getCategoryRisk(
  rating: PlaceRating,
  category: RatingCategory
): Risk {
  if (category === 'diningTypes' || rating.categories[category] === undefined) {
    return 'unknown';
  }

  const score = rating.categories[category]!;

  const adjustThreshold = (value: number) =>
    category === 'dividers' ? 0.25 * (value - 1) : value;

  let risk: Risk = 'low';
  if (score <= adjustThreshold(RISK_THRESHOLDS.high)) {
    risk = 'high';
  } else if (score <= adjustThreshold(RISK_THRESHOLDS.medium)) {
    risk = 'medium';
  }

  return risk;
}

function formatCategoryRating(
  rating: PlaceRating,
  category: RatingCategory
): string | null {
  if (rating.categories[category] === undefined) {
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