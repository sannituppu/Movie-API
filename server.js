import express from 'express';

const app = express();

app.listen(3001, () => {
  console.log('Server running in port 3001');
})

app.use(express.json());

app.post('/genres', (req, res) => {
  res.send();
});

app.post('/movies', (req, res) => {
  res.send();
});

app.get('/movies/:id', (req, res) => {
  res.send();
});

app.delete('/movies/:id', (req, res) => {
  res.send();
});

app.get('/movies', (req, res) => {
  res.send();
});

app.get('/movies/search', (req, res) => {
  res.send();
});

app.post('/users', (req, res) => {
  res.send();
});

app.post('/reviews', (req, res) => {
  res.send();
});

app.post('/favorites', (req, res) => {
  res.send();
});

app.get('/favorites/:username', (req, res) => {
  res.send();
});