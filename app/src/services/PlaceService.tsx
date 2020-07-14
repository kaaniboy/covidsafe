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
  }
};

const DEFAULT_CATEGORY_ICON = 'store';
const CATEGORY_ICONS = {
  'Food': 'food',
  'Nightlife Spot': 'food',
  'Shop & Service': 'store'
} as { [key in PlaceCategory]: string };

async function retrievePlaces(lat: number, lng: number): Promise<Place[]> {
  const ll = `?ll=${lat},${lng}`;
  const res = await fetch(PLACES_ENDPOINT + ll);

  const places: Place[] = await res.json();
  const sortedPlaces = places.sort(
    (a, b) => b.location.lat - a.location.lat
  );

  return new Promise<Place[]>(
    resolve => resolve(sortedPlaces)
  );
}

function getCategoryIcon(place: Place): string {
  return CATEGORY_ICONS[place.category] || DEFAULT_CATEGORY_ICON
}

export default {
  retrievePlaces,
  getCategoryIcon
};