require('dotenv').config();
const axios = require('axios');

const FS_CLIENT_ID = process.env.FOURSQUARE_CLIENT_ID;
const FS_CLIENT_SECRET = process.env.FOURSQUARE_CLIENT_SECRET;
const FS_PLACE_CATEGORIES = process.env.FOURSQUARE_PLACE_CATEGORIES;

const FS_PLACES_ENDPOINT = 
  'https://api.foursquare.com/v2/venues/search?'
  + `client_id=${FS_CLIENT_ID}&client_secret=${FS_CLIENT_SECRET}`
  + `&categoryId=${FS_PLACE_CATEGORIES}&radius=20000v=20200701`;

function setupFoursquare(app) {
  app.get('/places', async (req, res) => {
    const { ll } = req.query;
  
    try {
      const json = await axios.get(FS_PLACES_ENDPOINT + `&ll=${ll}`);
      const places = json.data.response.venues;
  
      res.json(places);
    } catch (error) {
      res.send(error);
    }
  });
}

module.exports = {
  setupFoursquare
};