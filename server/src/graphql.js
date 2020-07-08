require('dotenv').config();
const { postgraphile } = require('postgraphile');

const MODE = process.env.MODE || 'development';

const DEV_CONFIG = {
  watchPg: true,
  graphiql: true,
  enhanceGraphiql: true,
};

const PROD_CONFIG = {
  graphiql: false,
  enableQueryBatching: true,
  retryOnInitFail: true,
};

function setupGraphQL(app) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  app.use(
    postgraphile(
      process.env.DB_URL,
      process.env.DB_PUBLIC_SCHEMA,
      MODE === 'production'
        ? PROD_CONFIG : DEV_CONFIG
    )
  );
}

module.exports = {
  setupGraphQL
};