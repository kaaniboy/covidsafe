require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

const CLIENT_ID = process.env.FOURSQUARE_CLIENT_ID;
const CLIENT_SECRET = process.env.FOURSQUARE_CLIENT_SECRET;

const PLACES_ENDPOINT = 
  'https://api.foursquare.com/v2/venues/search?'
  + `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20200701`;

app.get('/places', async (req, res) => {
  const { ll } = req.query;

  try {
    const json = await axios.get(PLACES_ENDPOINT + `&ll=${ll}`);
    const places = json.data.response.venues;

    res.json(places);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));