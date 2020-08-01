const LOCATION_ENDPOINT = `https://covidsafe.herokuapp.com/location`;

export type CityLocation = {
  city: string,
  state_name: string,
  lat: number,
  lng: number
};

async function retrieveLocations(query: string): Promise<CityLocation[]> {
  const params = `?query=${query}`;
  const res = await fetch(LOCATION_ENDPOINT + params);
  return res.json();
}
export default {
  retrieveLocations
};