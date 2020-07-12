require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const FS_CLIENT_ID = process.env.FOURSQUARE_CLIENT_ID;
const FS_CLIENT_SECRET = process.env.FOURSQUARE_CLIENT_SECRET;
const FS_PLACE_CATEGORIES = process.env.FOURSQUARE_PLACE_CATEGORIES;
const FS_PLACE_RADIUS = process.env.FOURSQUARE_PLACE_RADIUS;

// Foursquare Endpoints: https://developer.foursquare.com/docs/places-api/endpoints/
const FS_PLACES_ENDPOINT = 
  'https://api.foursquare.com/v2/venues/search?'
  + `client_id=${FS_CLIENT_ID}&client_secret=${FS_CLIENT_SECRET}`
  + `&categoryId=${FS_PLACE_CATEGORIES}&radius=${FS_PLACE_RADIUS}&v=20200701`;

let CATEGORIES = [];

function loadCategories() {
  try {
    CATEGORIES = JSON.parse(
      fs.readFileSync('../db/categories.json')
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

async function handlePlacesRequest(req, res) {
  const { ll } = req.query;
  try {
    const json = await axios.get(FS_PLACES_ENDPOINT + `&ll=${ll}`);
    const places = json.data.response.venues;

    const categorizedPlaces = places.map(p => {
      p.category = findCategory(p);
      delete p.categories;
      return p;
    });

    res.json(categorizedPlaces);
  } catch (error) {
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