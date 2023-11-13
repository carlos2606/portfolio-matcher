const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
const lc = require('./langChainConfig');
const db = require('./db');
const { log } = require('console');

app.use(cors());
app.use(express.json()); // For parsing application/json

app.get('/', (req, res) => {
  res.send('Portfolio Matcher Backend is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Endpoint for searching portfolios
app.get('/api/search', async (req, res) => {
  try {
    const { searchQuery } = req.query;
    // Use LangChain to enhance search query processing
    const text = `Transform this user query into a sql query for the portfolios table filtering by the keywords column, rows can contain only one always, not necessarily all keywords, use OR operator always for keywords: "${searchQuery}"`;
    const processedQuery = await lc.predict(text);
    // const searchResult = processedQuery.choices[0].text.trim();
    console.log(processedQuery);
    const results = await db.query(processedQuery);
    res.json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/api/portfolios', async (req, res) => {
  try {
    const { title, description, image_url, keywords } = req.body;
    const newPortfolio = await db.query(
      'INSERT INTO portfolios (title, description, image_url, keywords) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, image_url, keywords]
    );
    res.json(newPortfolio.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/api/portfolios', async (req, res) => {
  try {
    const allPortfolios = await db.query('SELECT * FROM portfolios');
    res.json(allPortfolios.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.put('/api/portfolios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image_url, keywords } = req.body;
    const updatedPortfolio = await db.query(
      'UPDATE portfolios SET title = $1, description = $2, image_url = $3, keywords = $4 WHERE id = $5 RETURNING *',
      [title, description, image_url, keywords, id]
    );

    if (updatedPortfolio.rows.length === 0) {
      return res.status(404).send('Portfolio not found');
    }
    res.json(updatedPortfolio.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.delete('/api/portfolios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPortfolio = await db.query('DELETE FROM portfolios WHERE id = $1 RETURNING *', [id]);

    if (deletedPortfolio.rows.length === 0) {
      return res.status(404).send('Portfolio not found');
    }
    res.send('Portfolio deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/api/portfolios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const portfolio = await db.query('SELECT * FROM portfolios WHERE id = $1', [id]);
    if (portfolio.rows.length === 0) {
      return res.status(404).send('Portfolio not found');
    }
    res.json(portfolio.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// test endpoint for database connection
app.get('/test-db', async (req, res) => {
  try {
    const results = await db.query('SELECT NOW()');
    res.json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database connection error');
  }
});