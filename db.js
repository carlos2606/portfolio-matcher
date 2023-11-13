const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'portfolio_matcher',
  password: '',
  port: 5432,
});

module.exports = pool;

