import { DiningType } from './ReviewService';
import { Place } from './PlaceService';

export type Risk =
  'unknown' | 'low' | 'medium' | 'high';

export type RatingCategory =
  'employeeMasks' | 'customerMasks' | 'distancing' | 'dividers' | 'diningTypes';

export type PlaceRating = {
  overallRating?: number,
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

export const RISK_LABELS: { [key in Risk]: string } = {
  'unknown': '',
  'low': 'normal',
  'medium': 'increased',
  'high': 'high'
};

const NO_RATINGS_MESSAGE = 'This category does not have any ratings yet.';
const RATING_CATEGORY_MESSAGES: { [key in RatingCategory]: string } = {
  'employeeMasks': 'Employees %s wear masks.',
  'customerMasks': 'Customers %s wear masks.',
  'distancing': 'Social distancing is %s enforced.',
  'dividers': 'of reviewers say dividers are present.',
  'diningTypes': ''
};

function getOverallRisk(
  place: Place
): Risk {
  const { overallRating } = place.rating;

  if (overallRating === undefined) {
    return 'unknown';
  }

  if (overallRating <= RISK_THRESHOLDS.high) {
    return 'high';
  } else if (overallRating <= RISK_THRESHOLDS.medium) {
    return 'medium';
  }

  return 'low';
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
  getCategoryMessage,
  getCategoryRisk,
  formatCategoryRating,
  getOverallRisk
};