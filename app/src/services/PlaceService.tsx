const PLACES_ENDPOINT = `https://covidsafe.herokuapp.com/places`;

export type Place = {
  id: string,
  name: string,
  categories: {
    id: string,
    name: string
  }[],
  location: {
    address: string,
    lat: number,
    lng: number
  }
};

async function retrievePlaces(lat: number, lng: number): Promise<Place[]> {
  const ll = `?ll=${lat},${lng}`;
  const res = await fetch(PLACES_ENDPOINT + ll, {
    method: 'GET'
  });
  return res.json();
}

export default {
  retrievePlaces
};