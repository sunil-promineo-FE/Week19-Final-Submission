const API_KEY = '9cc42d4104ce2f48cf2f1bdb7f3617f0';
const API_BASE_URL = 'http://localhost:3001';

// Fetch popular movies from TMDB
export const fetchPopularMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

// Fetch all favorites
export const fetchFavorites = async () => {
  const response = await fetch(`${API_BASE_URL}/favorites`);
  if (!response.ok) {
    throw new Error('Failed to fetch favorites');
  }
  return response.json();
};

// Add a movie to favorites
export const addToFavorites = async (movie) => {
  console.log(`Request to add movie with ID: ${movie.id} to favorites`);
  const response = await fetch(`${API_BASE_URL}/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
  });
  if (!response.ok) {
    throw new Error('Failed to add to favorites');
  }
  console.log('Successfully added movie to favorites:', movie);
  return response.json();
};

// Remove a movie from favorites
export const removeFromFavorites = async (movieId) => {
  const url = `${API_BASE_URL}/favorites/${movieId}`;
  console.log(`Attempting to remove movie with ID: ${movieId} from URL: ${url}`);

  const response = await fetch(url, {
    method: 'DELETE',
  });

  if (!response.ok) {
    console.error(`Failed to remove movie with ID: ${movieId}. Status: ${response.status}`);
    throw new Error('Failed to remove from favorites');
  }

  console.log(`Successfully removed movie with ID: ${movieId}`);
  return response.json();
};

// Update a movie's remarks
export const updateMovieRemarks = async (movieId, remarks) => {
  const url = `${API_BASE_URL}/favorites/${movieId}`;
  console.log(`Attempting to update remarks for movie with ID: ${movieId}`);

  const response = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ remarks }), // Send the remarks in the request body
  });

  if (!response.ok) {
    console.error(`Failed to update remarks for movie with ID: ${movieId}. Status: ${response.status}`);
    throw new Error('Failed to update remarks');
  }

  console.log(`Successfully updated remarks for movie with ID: ${movieId}`);
  return response.json();
};

// Fetch Bollywood movies from TMDB
export const fetchBollywoodMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=hi`
  );
  const data = await response.json();
  return data.results;
};

// Search movies from TMDB
export const searchMovies = async (query, page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  );
  return response.json();
};

// Fetch movie details from TMDB
export const fetchMovieDetails = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );
  return response.json();
};

// Fetch all favorites


// Update a movie's rating
export const updateMovieRating = async (movieId, rating) => {
  const url = `${API_BASE_URL}/favorites/${movieId}`;
  console.log(`Attempting to update rating for movie with ID: ${movieId} from URL: ${url}`);

  const response = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rating }),
  });

  if (!response.ok) {
    console.error(`Failed to update rating for movie with ID: ${movieId}. Status: ${response.status}`);
    throw new Error('Failed to update rating');
  }

  console.log(`Successfully updated rating for movie with ID: ${movieId}`);
  return response.json();
};

// Update a movie's remarks
// Update a movie's remarks
