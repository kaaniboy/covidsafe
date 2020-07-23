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

function createPlaceRatingsMap(placeRatings) {
  let placeRatingsMap = {};
  placeRatings.forEach(placeRating => {
    const transformedRating = {
      categories: {
        employeeMasks: placeRating.employeeMasks,
        customerMasks: placeRating.customerMasks,
        distancing: placeRating.distancing,
        dividers: placeRating.dividers
      },
      diningTypes: {
        dine_in: placeRating.dineIn,
        pick_up: placeRating.pickUp,
        drive_thru: placeRating.driveThru
      }
    };

    placeRatingsMap[placeRating.id] = transformedRating;
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

module.exports = {
  fillPlaceRatings
};