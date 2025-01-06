import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const app = express();

app.listen(3001, () => {
  console.log('Server running in port 3001');
})

app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
});

connectDB();

async function connectDB() {
  try{
    await pool.connect();
    console.log('Database connected');
  }catch(err){
    console.log(err);
  }
}

app.post('/genres', async (req, res) => {
  const { name } = req.body;
  const result = await pool.query('INSERT INTO genres (name) VALUES ($1) RETURNING *', [name]);
  res.send('New genre created');
});

app.post('/movies', async (req, res) => {
  const { name, year, genreName } = req.body;
  const result = await pool.query(
    'INSERT INTO movies (name, year, genre_name) VALUES ($1, $2, $3) RETURNING *',
    [name, year, genreName]
  );
  res.send('Movie added');
});

app.get('/movies/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);

  if (result.rows.length === 0) {
    return res.status(404).send('Movie not found');
  }

  res.json(result.rows[0]);
});

app.delete('/movies/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('DELETE FROM movies WHERE id = $1 RETURNING *', [id]);
  res.send('Movie deleted');
});

app.get('/movies', async (req, res) => {
  const result = await pool.query('SELECT * FROM movies');
  res.json(result.rows);
});

app.post('/users', async (req, res) => {
  const { name, username, password, yearOfBirth } = req.body;
  const result = await pool.query(
    'INSERT INTO users (name, username, password, year_of_birth) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, username, password, yearOfBirth]
  );
  res.send('User created');
});

app.post('/reviews', async (req, res) => {
  const { username, stars, reviewText, movieId } = req.body;
  const result = await pool.query(
    'INSERT INTO reviews (username, stars, review_text, movie_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [username, stars, reviewText, movieId]
  );
  res.send('Review added');
});

app.post('/favorites', async (req, res) => {
  const { username, movieId } = req.body;
  const result = await pool.query(
    'INSERT INTO favorites (username, movie_id) VALUES ($1, $2) RETURNING *',
    [username, movieId]
  );
  res.send('Favorite movie added');
});