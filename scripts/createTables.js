const db = require('../db');

const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS portfolios (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image_url VARCHAR(255),
        keywords TEXT
      );
    `);
    console.log('Tables created successfully');
  } catch (err) {
    console.error(err);
  }
};

createTables();