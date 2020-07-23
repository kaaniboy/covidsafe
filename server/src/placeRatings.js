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
          pickUp
          driveThru
          dineIn
        }
      }
    }
  }
`;

function createPlaceRatingsMap(placeRatings) {
  let placeRatingsMap = {};
  placeRatings.forEach(placeRating => {
    placeRatingsMap[placeRating.id] = placeRating;
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
      place.rating = {};
    });
    return places;
  }

  const placeRatings = query.batchPlaceRatings.edges
    .map(edge => edge.node);

  const placeRatingsMap = createPlaceRatingsMap(placeRatings);
  places.forEach(place => {
    place.rating = placeRatingsMap[place.id] || {};
  });
  return places;
}

module.exports = {
  fillPlaceRatings
};