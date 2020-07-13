import { Review, DiningType } from './ReviewService';

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

const NO_RATINGS_MESSAGE = 'This category does not have any ratings yet.';
const RATING_CATEGORY_MESSAGES = {
  'employeeMasks': 'Employees %s wear masks.',
  'customerMasks': 'Customers %s wear masks.',
  'distancing': 'Social distancing is %s enforced.',
  'dividers': 'of reviewers say dividers are present.'
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
      'employeeMasks': calculateRating('employeeMasks', reviews),
      'customerMasks': calculateRating('customerMasks', reviews),
      'distancing': calculateRating('distancing', reviews),
      'dividers': calculateRating('dividers', reviews),
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

function formatCategoryRating(
  rating: PlaceRating,
  category: RatingCategory
): string | null {
  if (!rating.categories[category]) {
    return null;
  }

  return category === 'dividers'
    ? `${(rating.categories[category]! * 100).toFixed(0)} %`
    : `${rating.categories[category]!.toFixed(1)} / 5`;
}

export default {
  ratePlace,
  getCategoryMessage,
  formatCategoryRating
};