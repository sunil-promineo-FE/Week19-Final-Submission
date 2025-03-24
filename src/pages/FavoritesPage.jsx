import React, { useEffect, useState } from 'react';
import { fetchFavorites } from '../api';
import MovieCard from './MovieCard';

const FavoritesPage = () => {
  const updateFavoriteNote = async (movieId, note) => {
    try {
      await updateMovieRemarks(movieId, note);
      setFavorites((prevFavorites) =>
        prevFavorites.map((movie) =>
          movie.id === movieId ? { ...movie, note } : movie
        )
      );
    } catch (error) {
      console.error('Failed to update favorite note:', error);
    }
  };

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        console.log('Starting favorites fetch...');
        const data = await fetchFavorites();
        console.log('Favorites data received:', data);
        setFavorites(data); // Assuming data is an array of favorites
      } catch (err) {
        console.error('Favorites fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getFavorites();
  }, []);

  const handleRemove = (movieId) => {
    console.log(`Removing movie with ID: ${movieId} from state`);
    setFavorites((prevFavorites) => prevFavorites.filter((movie) => movie.id !== movieId));
  };

  if (loading) return <div className="container mt-4">Loading favorites...</div>;  
  if (error) return <div className="container mt-4 text-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h1>Favorites</h1>
      <div className="row">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <div key={movie.id} className="col-md-4 col-lg-3 mb-4">
              <MovieCard
                movie={movie}
                showAddButton={false}
                onRemove={handleRemove}
                showRemarksInput={true}
              />
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-muted">No favorites added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
