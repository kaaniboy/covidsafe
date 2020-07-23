require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { setupGraphQL } = require('./graphql');
const { setupFoursquare } = require('./foursquare');
const { setupPlaceRatings } = require('./placeRatings');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

setupGraphQL(app);
setupFoursquare(app);
setupPlaceRatings(app);

app.listen(port, () => console.log(`Listening on port ${port}`));