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

app.post('/genres', (req, res) => {
  const { name } = req.body;
  res.send('New genre created');
});

app.post('/movies', (req, res) => {
  const { name, year, genreId } = req.body;
  res.send('Movie added');
});

app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  res.send('Movie fetched');
});

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params;
  res.send('Movie deleted');
});

app.get('/movies', (req, res) => {
  const { } = req.query;
  res.send('All movies fetched');
});

app.get('/movies/search', (req, res) => {
  const { keyword } = req.query;
  res.send('Movies matching keyword fetched');
});

app.post('/users', (req, res) => {
  const { name, username, password, yearOfBirth } = req.body;
  res.send('User created');
});

app.post('/reviews', (req, res) => {
  const { username, stars, reviewText, movieId } = req.body;
  res.send('Review added');
});

app.post('/favorites', (req, res) => {
  const { username, movieId } = req.body;
  res.send('Favorite movie added');
});

app.get('/favorites/:username', (req, res) => {
  const { username } = req.params;
  res.send('Favorite movies fetched');
});