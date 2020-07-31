const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const LOCATIONS_FILE = process.env.LOCATIONS_FILE;
let LOCATIONS = {};

function loadLocations() {
  try {
    const locations = parse(
      fs.readFileSync(LOCATIONS_FILE),
      { columns: true, skip_empty_lines: true }
    );

    locations.forEach(l => {
      const nameLower = l.city.toLowerCase();
      if (nameLower in LOCATIONS) {
        LOCATIONS[nameLower].push(l);
      } else {
        LOCATIONS[nameLower] = [l];
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function handleLocationRequest(req, res) {
  const { query } = req.query;
  res.json(LOCATIONS[query.toLowerCase()] || []);
}

function setupLocations(app) {
  loadLocations();
  app.get('/location', handleLocationRequest);
}

module.exports = {
  setupLocations
};