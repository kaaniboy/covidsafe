import L from 'leaflet';
import RatingService from './RatingService';
import { Place } from './PlaceService';

const MARKER_ICONS = {
  'food_unknown': createIcon('markers/marker_food_unknown.png'),
  'food_low': createIcon('markers/marker_food_low.png'),
  'food_medium': createIcon('markers/marker_food_medium.png'),
  'food_high': createIcon('markers/marker_food_high.png'),
  'retail_unknown': createIcon('markers/marker_retail_unknown.png'),
  'retail_low': createIcon('markers/marker_retail_low.png'),
  'retail_medium': createIcon('markers/marker_retail_medium.png'),
  'retail_high': createIcon('markers/marker_retail_high.png')
};

function createIcon(iconUrl: string) {
  return L.icon({
    iconUrl,
    iconSize: [30, 65],
    iconAnchor: [15, 65]
  });
}

function getMarkerIcon(place: Place): L.Icon {
  const risk = RatingService.getOverallRisk(place);
  const category = place.category === 'Food'
    ? 'food'
    : 'retail';
    
  return (MARKER_ICONS as any)[`${category}_${risk}`] as L.Icon;
}

export default {
  getMarkerIcon
};