require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const { fillPlaceRatings } = require('./placeRatings');

const FS_CLIENT_ID = process.env.FOURSQUARE_CLIENT_ID;
const FS_CLIENT_SECRET = process.env.FOURSQUARE_CLIENT_SECRET;
const FS_PLACE_CATEGORIES = process.env.FOURSQUARE_PLACE_CATEGORIES;
const FS_PLACE_RADIUS = process.env.FOURSQUARE_PLACE_RADIUS;
const FS_CATEGORIES_FILE = process.env.FOURSQUARE_CATEGORIES_FILE;

// Foursquare Endpoints: https://developer.foursquare.com/docs/places-api/endpoints/
const FS_PLACES_ENDPOINT =
  'https://api.foursquare.com/v2/venues/search?'
  + `client_id=${FS_CLIENT_ID}&client_secret=${FS_CLIENT_SECRET}`
  + `&categoryId=${FS_PLACE_CATEGORIES}&v=20200701`;

const FS_RECOMMENDATIONS_ENDPOINT =
  'https://api.foursquare.com/v2/search/recommendations?'
  + `client_id=${FS_CLIENT_ID}&client_secret=${FS_CLIENT_SECRET}&v=20200701`;

let CATEGORIES = [];

// Listing of venue recommendations that can be triggered by the specified keywords.
const RECOMMENDED_CATEGORIES = {
  'coffee': ['coffee', 'coffee shop', 'coffee shops'],
  'food': ['food', 'restaurant', 'restaurants'],
  'breakfast': ['breakfast'],
  'lunch': ['lunch'],
  'dinner': ['dinner', 'dining'],
  'drinks': ['drinks', 'bar', 'bars', 'pub', 'pubs', 'club', 'clubs', 'brewery', 'breweries']
};

function loadCategories() {
  try {
    CATEGORIES = JSON.parse(
      fs.readFileSync(FS_CATEGORIES_FILE)
    ).categories;
  } catch (error) {
    console.log(error);
  }
}

function findCategory(place) {
  const placeCategoryId = place.categories[0].id;
  const matchingCategory = CATEGORIES.find(
    category => findCategoryHelper(placeCategoryId, category)
  );
  return matchingCategory.name;
}

function findCategoryHelper(placeCategoryId, category) {
  return category.id === placeCategoryId || category.categories.some(
    c => findCategoryHelper(placeCategoryId, c)
  );
}

function getRecommendedCategory(query) {
  if (!query) {
    return null;
  }

  query = query.toLowerCase().trim();
  for (const [category, keywords] of Object.entries(RECOMMENDED_CATEGORIES)) {
    if (keywords.includes(query)) {
      return category;
    }
  }
  return null;
}

async function retrievePlaces(ll, query) {
  // Exclude radius if a query is provided
  const params = query
    ? `&ll=${ll}&query=${query}`
    : `&ll=${ll}&radius=${FS_PLACE_RADIUS}`;

  const json = await axios.get(FS_PLACES_ENDPOINT + params);
  return json.data.response.venues;
}

async function retrieveRecommendations(ll, category) {
  const params = `&ll=${ll}&radius=${FS_PLACE_RADIUS}&intent=${category}`;

  const json = await axios.get(FS_RECOMMENDATIONS_ENDPOINT + params);
  return json.data.response.group.results.map(result => result.venue);
}

async function handlePlacesRequest(req, res) {
  const { ll, query } = req.query;
  const category = getRecommendedCategory(query);

  try {
    const places = category
      ? await retrieveRecommendations(ll, category)
      : await retrievePlaces(ll, query);

    const ratedPlaces = await fillPlaceRatings(places);

    const categorizedPlaces = ratedPlaces.map(p => {
      p.category = findCategory(p);
      delete p.categories;
      return p;
    });

    res.json(categorizedPlaces);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

function setupFoursquare(app) {
  loadCategories();
  app.get('/places', handlePlacesRequest);
}

module.exports = {
  setupFoursquare
};