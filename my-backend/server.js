// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let favorites = [
  { id: 1, title: "Inception", overview: "A thief who steals corporate secrets through the use of dream-sharing technology.", poster_path: "/qmDpIHrmpJINaRKAfWQEhZ2w3Z.jpg", note: "" },
  { id: 2, title: "The Dark Knight", overview: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.", poster_path: "/1hRoyzgtgNIz8Ww8U4P8yW1z2wD.jpg", note: "" },
  { id: 3, title: "Interstellar", overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", poster_path: "/gEU2QniE6E77NI6lCU6M8kY8x8A.jpg", note: "" }
]; // This will act as your in-memory database


// GET endpoint to fetch all favorites
app.get('/favorites', (req, res) => {
  res.json(favorites);
});

// POST endpoint to add a movie to favorites
app.post('/favorites', (req, res) => {
  const movie = req.body;
  favorites.push(movie);
  res.status(201).json(movie);
});

// DELETE endpoint to remove a movie from favorites
app.delete('/favorites/:id', (req, res) => {
  const movieId = parseInt(req.params.id, 10);
  const index = favorites.findIndex(movie => movie.id === movieId);

  if (index !== -1) {
    favorites.splice(index, 1); // Remove the movie from the array
    res.status(200).json({ message: 'Movie removed from favorites' });
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

app.patch('/favorites/:id', (req, res) => {
  const movieId = parseInt(req.params.id, 10);
  const index = favorites.findIndex(movie => movie.id === movieId);

  if (index !== -1) {
    const updatedMovie = { ...favorites[index], ...req.body }; // Merge existing movie with updated data
    favorites[index] = updatedMovie; // Update the movie in the array
    res.status(200).json(updatedMovie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

// Start the server

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
