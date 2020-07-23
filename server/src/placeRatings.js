require('dotenv').config();
const { request } = require('graphql-request');

const GRAPHQL_URL = process.env.GRAPHQL_URL;

const BATCH_PLACE_RATINGS_QUERY = `
  query ($placeIds: [String]!) {
    batchPlaceRatings(placeIds: $placeIds) {
      edges {
        node {
          id
          overallRating
          customerMasks
          distancing
          dividers
          employeeMasks
          dineIn
          pickUp
          driveThru
        }
      }
    }
  }
`;

const PLACE_RATING_QUERY = `
  query ($placeId: String!) {
    placeById(id: $placeId) {
      id
      overallRating
      employeeMasks
      customerMasks
      distancing
      dividers
      dineIn
      pickUp
      driveThru
    }
  }
`;

function nullToUndefined(value) {
  if (value === null) {
    return undefined;
  }
  return value;
}

function structurePlaceRating(placeRating) {
  let diningTypes = undefined;

  if (placeRating.dineIn + placeRating.pickUp + placeRating.driveThru > 0) {
    diningTypes = {
      dine_in: placeRating.dineIn,
      pick_up: placeRating.pickUp,
      drive_thru: placeRating.driveThru
    };
  }

  return {
    overallRating: nullToUndefined(placeRating.overallRating),
    categories: {
      employeeMasks: nullToUndefined(placeRating.employeeMasks),
      customerMasks: nullToUndefined(placeRating.customerMasks),
      distancing: nullToUndefined(placeRating.distancing),
      dividers: nullToUndefined(placeRating.dividers)
    },
    diningTypes
  };
}

function createPlaceRatingsMap(placeRatings) {
  let placeRatingsMap = {};

  placeRatings.forEach(placeRating => {
    placeRatingsMap[placeRating.id] = structurePlaceRating(placeRating);
  });
  return placeRatingsMap;
}

async function fillPlaceRatings(places) {
  let query;
  try {
    query = await request(
      GRAPHQL_URL,
      BATCH_PLACE_RATINGS_QUERY,
      { placeIds: places.map(p => p.id) }
    );
  } catch (error) {
    console.log(error);
    places.forEach(place => {
      place.rating = { categories: {} };
    });
    return places;
  }

  const placeRatings = query.batchPlaceRatings.edges
    .map(edge => edge.node);
  const placeRatingsMap = createPlaceRatingsMap(placeRatings);

  places.forEach(place => {
    place.rating = placeRatingsMap[place.id] || { categories: {} };
  });
  return places;
}

async function handlePlaceRatingRequest(req, res) {
  const { placeId } = req.query;

  try {
    const query = await request(
      GRAPHQL_URL,
      PLACE_RATING_QUERY,
      { placeId }
    );

    if (query.placeById === null) {
      return res.json({ categories: {} });
    }

    res.json(structurePlaceRating(query.placeById));
  } catch (error) {
    console.log(error);
    res.json({ categories: {} });
  }
}

function setupPlaceRatings(app) {
  app.get('/rating', handlePlaceRatingRequest);
}

module.exports = {
  fillPlaceRatings,
  setupPlaceRatings
};