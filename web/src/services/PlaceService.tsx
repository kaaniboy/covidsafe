import { IconName } from '@fortawesome/fontawesome-svg-core';
import { PlaceRating } from './RatingService';

const PLACES_ENDPOINT = `https://covidsafe.herokuapp.com/places`;

export type PlaceCategory = 'Food' | 'Nightlife Spot' | 'Shop & Service';

export type Place = {
  id: string,
  name: string,
  category: PlaceCategory,
  location: {
    address: string,
    lat: number,
    lng: number
  },
  rating: PlaceRating
};

const DEFAULT_CATEGORY_ICON = 'store';
const CATEGORY_ICONS = {
  'Food': 'utensils',
  'Nightlife Spot': 'utensils',
  'Shop & Service': 'store'
} as { [key in PlaceCategory]: IconName };

async function retrievePlaces(
  lat: number,
  lng: number,
  query?: string
): Promise<Place[]> {
  const ll = query
    ? `?query=${query}&ll=${lat},${lng}`
    : `?ll=${lat},${lng}`;

  const res = await fetch(PLACES_ENDPOINT + ll);

  const places: Place[] = await res.json();
  const sortedPlaces = places.sort(
    (a, b) => b.location.lat - a.location.lat
  );

  console.log(sortedPlaces.map(p => p.id).join('\n'));
  console.log(sortedPlaces.map(p => p.name).join('\n'));

  return new Promise<Place[]>(
    resolve => resolve(sortedPlaces)
  );
}

function getCategoryIcon(place: Place): IconName {
  return CATEGORY_ICONS[place.category] || DEFAULT_CATEGORY_ICON
}

export default {
  retrievePlaces,
  getCategoryIcon
};